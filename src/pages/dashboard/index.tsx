import { useEffect, useState } from "react";
import { PageLayout } from "../../components/Page";
import { Panel } from "../../components/Panel";
import { Body, Headline, LargeTitle } from "../../components/Typography";
import { FetchPageResponse, deleteUser, fetchPageOfUsers } from "../../backend";
import { User } from "../../types";
import { Button } from "../../components/Button";
import { Flex } from "../../components/Flex";
import styled from "styled-components";
import Image from "next/image";
import { FaDoorOpen, FaTrash } from "react-icons/fa";
import React from "react";
import Modal from "../../components/Modal";
import RegisterForm from "./RegisterForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

export default function Dashboard() {
  const [pageData, setPageData] = useState<FetchPageResponse>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>();
  const router = useRouter();
  const PAGE_SIZE = 8;

  useEffect(() => {
    const fetchUsers = async () => {
      let queryParams = { page: pageNumber, per_page: PAGE_SIZE };
      const allUsers = await fetchPageOfUsers(queryParams);
      setPageData(allUsers);
    };
    fetchUsers();
  }, [pageNumber]);

  useEffect(() => {
    let isCurrentPageEmpty = pageNumber === pageData?.page && pageData?.data?.length === 0;
    if (isCurrentPageEmpty) {
      setPageNumber(pageNumber - 1);
    }
  }, [pageNumber, pageData]);

  const handleDelete = async (id: number) => {
    const response = await deleteUser(id);
    if (response.statusCode === 422 || response.statusCode === 401) {
      toast.error(response.data.message);
    } else {
      const refetchedPage = await fetchPageOfUsers({ page: pageNumber, per_page: PAGE_SIZE });
      setPageData(refetchedPage);
      toast("User deleted");
      if (refetchedPage.data?.length === 0) {
        setPageNumber(pageNumber - 1);
      }
    }
  };

  const handleAddUser = async (newUser: User) => {
    if (pageData?.data?.length + 1 > pageData?.per_page) {
      const refetchedUsers = await fetchPageOfUsers({ page: pageNumber, per_page: PAGE_SIZE });
      setPageData(refetchedUsers);
      setPageNumber(pageNumber + 1);
    } else {
      setPageData({ ...pageData, data: [...pageData.data, newUser] });
    }
  };

  return (
    <PageLayout>
      <Heading gap={"var(--spacing-md)"} justify={"space-between"}>
        <Flex gap={"var(--spacing-md)"}>
          <LargeTitle role={"h1"}>Dashboard</LargeTitle>
        </Flex>
        <PageButtons>
          <Button onClick={() => setIsOpen(true)}>Add User</Button>
          <Flex gap={"var(--spacing-md)"}>
            <Button disabled={pageData?.page <= 1} onClick={() => setPageNumber(pageNumber - 1)}>
              Previous
            </Button>
            <Body>Page {pageData?.page}</Body>
            <Button
              disabled={pageNumber >= pageData?.total_pages}
              onClick={() => setPageNumber(pageNumber + 1)}
            >
              Next
            </Button>
          </Flex>
        </PageButtons>
      </Heading>
      {pageData?.data?.map((user) => (
        <StyledPanel>
          <ImageContainer>
            <Image
              fill
              priority
              objectFit="contain"
              src={user.display_picture}
              alt="User display picture"
            />
          </ImageContainer>
          <UserDetails>
            <Headline>
              {user.first_name} {user.last_name}
            </Headline>

            <Body>{user.email}</Body>
            <Body>ID: {user.id}</Body>
            <IconContainer onClick={() => handleDelete(user.id)}>
              <FaTrash size={20} />
            </IconContainer>
          </UserDetails>
        </StyledPanel>
      ))}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <RegisterForm
          onClose={() => {
            setIsOpen(false);
          }}
          appendUser={handleAddUser}
        />
      </Modal>
      <LogoutContainer>
        <Button
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/login?from=logout");
          }}
          css={`
            display: flex;
            gap: var(--spacing-md);
            margin-top: var(--spacing-lg);
          `}
        >
          <Headline>Log out</Headline>
          <FaDoorOpen size={20} />
        </Button>
      </LogoutContainer>
      <ToastContainer theme={"dark"} />
    </PageLayout>
  );
}

const Heading = styled(Flex)`
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const IconContainer = styled.div`
  position: absolute;
  right: 0;
  top: 40%;
  margin: var(--spacing-md);
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
  @media (max-width: 425px) {
    top: unset;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
`;

const LogoutContainer = styled(Flex)``;

const PageButtons = styled(Flex)`
  width: 100%;
  gap: var(--spacing-sm);
  justify-content: space-between;
`;

const StyledPanel = styled(Panel)`
  display: flex;
  position: relative;
  gap: var(--spacing-md);
  @media (max-width: 425px) {
    flex-direction: column;
    align-items: center;
  }
`;

const UserDetails = styled(Flex)`
  width: 100%;
  align-items: flex-start;
  flex-direction: column;
`;

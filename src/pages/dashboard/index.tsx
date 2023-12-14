import { useEffect, useState } from "react";
import { PageLayout } from "../../components/Page";
import { Panel } from "../../components/Panel";
import { Footnote, Headline, LargeTitle } from "../../components/Typography";
import { deleteUser, fetchAllUsers } from "../../backend";
import { AllUsersResponse } from "../../types";
import { Button } from "../../components/Button";
import { Flex } from "../../components/Flex";
import styled from "styled-components";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import React from "react";
import Modal from "../../components/Modal";
import RegisterForm from "../../components/RegisterForm";

export default function Dashboard() {
  const [token, setToken] = useState<string>();
  const [users, setUsers] = useState<AllUsersResponse>();
  const [page, setPage] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>();

  useEffect(() => {
    if (window !== undefined) {
      const token = localStorage.getItem("token");
      setToken(token);
    }
  }, [token]);

  useEffect(() => {
    if (Boolean(token)) {
      const allUsersPromise = async () => {
        const allUsers = await fetchAllUsers(token, { page });
        setUsers(allUsers);
      };
      allUsersPromise();
    }
  }, [token, page]);

  const handleDelete = async (id) => {
    const response = await deleteUser(id);
    if (response.ok) {
      console.log("response ok!");
    }
  };

  return (
    <PageLayout>
      <Flex justify={"space-between"}>
        <Flex gap={"var(--spacing-md)"}>
          <LargeTitle>Dashboard</LargeTitle>
          <Button onClick={() => setIsOpen(true)}>Add User</Button>
        </Flex>
        <PageButtons>
          {users?.page > 1 && <Button onClick={() => setPage(page - 1)}>Previous page</Button>}
          <Footnote>Page {users?.page}</Footnote>
          {page < users?.total_pages && (
            <Button onClick={() => setPage(page + 1)}>Next page</Button>
          )}
        </PageButtons>
      </Flex>

      {users?.data?.map((user) => (
        <StyledPanel>
          <ImageContainer>
            <Image fill objectFit="contain" src={user.display_picture} alt="User display picture" />
          </ImageContainer>
          <UserDetails>
            <Headline>
              {user.first_name} {user.last_name}
            </Headline>

            <Footnote>{user.email}</Footnote>
            <Footnote>ID: {user.id}</Footnote>
            <IconContainer onClick={() => handleDelete(user.id)}>
              <FaTrash size={20} />
            </IconContainer>
          </UserDetails>
        </StyledPanel>
      ))}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <RegisterForm onClose={() => setIsOpen(false)} />
      </Modal>
    </PageLayout>
  );
}
const PageButtons = styled(Flex)`
  gap: var(--spacing-sm);
`;

const UserDetails = styled(Flex)`
  width: 100%;
  align-items: flex-start;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
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

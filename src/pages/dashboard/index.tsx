import { useEffect, useState } from "react";
import { PageLayout } from "../../components/Page";
import { Panel } from "../../components/Panel";
import { Footnote, Headline, LargeTitle } from "../../components/Typography";
import { fetchAllUsers } from "../../backend";
import { AllUsersResponse } from "../../types";
import { Button } from "../../components/Button";
import { Flex } from "../../components/Flex";
import styled from "styled-components";
import Image from "next/image";

export default function Dashboard() {
  const [token, setToken] = useState<string>();
  const [users, setUsers] = useState<AllUsersResponse>();
  const [page, setPage] = useState<number>(1);

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

  return (
    <PageLayout>
      <Flex justify={"space-between"}>
        <LargeTitle>Dashboard</LargeTitle>
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
            <Footnote></Footnote>
          </UserDetails>
        </StyledPanel>
      ))}
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

const StyledPanel = styled(Panel)`
  display: flex;
  gap: var(--spacing-md);
  @media (max-width: 425px) {
    flex-direction: column;
    align-items: center;
  }
`;

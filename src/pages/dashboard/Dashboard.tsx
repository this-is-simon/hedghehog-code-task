import { useEffect, useState } from "react";
import { PageLayout } from "../../components/Page";
import { Panel } from "../../components/Panel";
import { LargeTitle } from "../../components/Typography";
import { fetchAllUsers } from "../../backend";
import { AllUsersResponse } from "../../types";
import { Button } from "../../components/Button";

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
      const fetchAllUsersPromise = async () => {
        const allUsers = await fetchAllUsers(token, { page });
        setUsers(allUsers);
        console.log({ allUsers });
      };
      fetchAllUsersPromise();
    }
  }, [token, page]);

  return (
    <PageLayout>
      <Flex>
        <LargeTitle>Dashboard</LargeTitle>
      </Flex>
      {users?.page > 1 && <Button onClick={() => setPage(page - 1)}>Previous page</Button>}
      <p>Page {users?.page}</p>
      {page < users?.total_pages && <Button onClick={() => setPage(page + 1)}>Next page</Button>}

      {users?.data?.map((user) => (
        <Panel>
          {user.first_name}, {user.email}
          <img src={user.display_picture} />
        </Panel>
      ))}
      {/* </Panel> */}
    </PageLayout>
  );
}

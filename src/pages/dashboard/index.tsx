import { useEffect, useState } from "react";
import { PageLayout } from "../../components/Page";
import { Panel } from "../../components/Panel";
import { LargeTitle } from "../../components/Typography";
import { fetchAllUsers } from "../../backend";
import { AllUsersResponse } from "../../types";

export default function Dashboard() {
  const [token, setToken] = useState<string>();
  const [users, setUsers] = useState<AllUsersResponse>();
  const [page, setPage] = useState<number>();

  useEffect(() => {
    if (window !== undefined) {
      const token = localStorage.getItem("token");
      setToken(token);
    }
  }, [token]);

  useEffect(() => {
    if (Boolean(token)) {
      const fetchAllUsersPromise = async () => {
        const allUsers = await fetchAllUsers(token);
        setUsers(allUsers);
        console.log({ allUsers });
      };
      fetchAllUsersPromise();
    }
  }, [token, page]);

  return (
    <PageLayout>
      <LargeTitle>Dashboard</LargeTitle>
      <Panel
        css={`
          min-width: 300px;
          display: flex;
          flex-direction: column;
        `}
      >
        <ul>
          {users?.data?.map((user) => (
            <li>
              {user.first_name}, {user.email}
              <img src={user.display_picture} />
            </li>
          ))}
        </ul>
      </Panel>
    </PageLayout>
  );
}

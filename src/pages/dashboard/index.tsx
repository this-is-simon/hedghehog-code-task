import { useEffect, useState } from "react";
import { PageLayout } from "../../components/Page";
import { Panel } from "../../components/Panel";
import { LargeTitle } from "../../components/Typography";
import { fetchAllUsers } from "../../backend";

export default function Dashboard() {
  const [token, setToken] = useState<string>();

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
        console.log({ allUsers });
      };
      fetchAllUsersPromise();
    }
  }, [token]);

  return (
    <PageLayout>
      <LargeTitle>Dashboard</LargeTitle>
      <Panel
        css={`
          min-width: 300px;
        `}
      >
        Welcome to the dashboard, you did it {token}
        {/* //TODO list of users*/}
      </Panel>
    </PageLayout>
  );
}

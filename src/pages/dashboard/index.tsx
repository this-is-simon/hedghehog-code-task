import { PageLayout } from "../../components/Page";
import { Panel } from "../../components/Panel";
import { LargeTitle } from "../../components/Typography";

export default function Dashboard() {
  const token = localStorage.getItem("token");

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

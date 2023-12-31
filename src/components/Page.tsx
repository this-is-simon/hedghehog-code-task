import Head from "next/head";
import styled from "styled-components";

interface Props {
  children: React.ReactNode;
}
export const PageLayout = ({ children }: Props) => (
  <PageContainer>
    <Head>
      <title>Dashboard Portal</title>
      <meta name="description" content="The cause of, and solution to, all of life's problems" />
    </Head>
    <PageContent>{children}</PageContent>
  </PageContainer>
);

const PageContainer = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--spacing-xxl) var(--spacing-xl);
  @media (max-width: 480px) {
    padding: var(--spacing-xxl) var(--spacing-xxs);
  }
`;

const PageContent = styled.div`
  max-width: 600px;
  width: 100%;
  @media (max-width: 768px) {
    min-width: auto;
    max-width: auto;
  }
`;

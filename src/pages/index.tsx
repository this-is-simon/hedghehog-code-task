import Head from "next/head";
import { Body, Footnote, HeaderTitle, Headline, Subhead, Title2 } from "../components/Typography";
import { PageLayout } from "../components/Page";
import css, { styled } from "styled-components";
import { Flex } from "../components/Flex";

export default function Home() {
  // first_name: "Simon",
  // last_name: "Atkins",
  // email: "test@simon.com",
  // password: "hello",
  // password_confirmation: "hello",

  return (
    <>
      <Head>
        <title>Hedghehog Portal</title>
        <meta name="description" content="A window to the soul" />
      </Head>

      <main>
        <PageLayout>
          <Content align={"flex-start"} gap={"var(--spacing-md)"}>
            <p> Hello, please log in.</p>
          </Content>
        </PageLayout>
      </main>
    </>
  );
}

const Content = styled(Flex)`
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const StyledIcon = styled.a`
  color: rgb(var(--text-color));
  &:hover {
    opacity: 0.6;
  }
`;

import Head from "next/head";
import { Body, Footnote, HeaderTitle, Headline, Subhead, Title2 } from "../components/Typography";
import { PageLayout } from "../components/Page";
import css, { styled } from "styled-components";
import { Flex } from "../components/Flex";
import { Button } from "../components/Button";
import { login, registerUser } from "../backend";

export default function Home() {
  const newuserdata = {
    first_name: "Simon",
    last_name: "Atkins",
    email: "test@simon.com",
    password: "hello",
    password_confirmation: "hello",
  };
  //status code 409 => user already exists, please log in

  const existingUserData = {
    email: "test@simon.com",
    password: "hello",
  };

  return (
    <>
      <Head>
        <title>Hedghehog Portal</title>
        <meta name="description" content="A window to the soul" />
      </Head>

      <main>
        <PageLayout>
          <Content align={"flex-start"} gap={"var(--spacing-md)"}>
            <p>Register New User</p>
            <Button onClick={() => registerUser(newuserdata)}>Register</Button>
            <Button onClick={() => login(existingUserData)}>Login</Button>
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

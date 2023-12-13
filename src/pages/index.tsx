import Head from "next/head";
import { Body, Footnote, HeaderTitle, Headline, Subhead, Title2 } from "../components/Typography";
import { PageLayout } from "../components/Page";
import css, { styled } from "styled-components";
import { Flex } from "../components/Flex";
import { Button } from "../components/Button";
import { login, registerUser } from "../backend";
import { Panel } from "../components/Panel";
import { Input } from "../components/Input";

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
          <Content direction={"column"}>
            <Panel>
              <Flex
                direction={"column"}
                align={"center"}
                justify={"center"}
                gap={"var(--spacing-md)"}
                css={`
                  width: 500px;
                `}
              >
                <p>Register New User</p>
                <Input aria-label={"First Name"}></Input>
                <Input aria-label={"Second Name"}></Input>
                <Input aria-label={"Email"}></Input>
                <Input aria-label={"Password"}></Input>
                <Input aria-label={"Password Confirmation"}></Input>
                <Button onClick={() => registerUser(newuserdata)}>Register</Button>
                <Button onClick={() => login(existingUserData)}>Login</Button>
              </Flex>
            </Panel>
          </Content>
        </PageLayout>
      </main>
    </>
  );
}

const Content = styled(Flex)`
  flex-direction: column;
`;

const StyledIcon = styled.a`
  color: rgb(var(--text-color));
  &:hover {
    opacity: 0.6;
  }
`;

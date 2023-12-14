import Head from "next/head";
import {
  Body,
  Footnote,
  HeaderTitle,
  Headline,
  LargeTitle,
  Title2,
} from "../components/Typography";
import { PageLayout } from "../components/Page";
import css, { styled } from "styled-components";
import { Flex } from "../components/Flex";
import { Button } from "../components/Button";
import { login, registerUser } from "../backend";
import { Panel } from "../components/Panel";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components/Input";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Home() {
  // const newuserdata = {
  //   first_name: "Simon",
  //   last_name: "Atkins",
  //   email: "test@simon.com",
  //   password: "hello",
  //   password_confirmation: "hello",
  // };
  //status code 409 => user already exists, please log in

  const router = useRouter();

  const existingUserData = {
    email: "test@simon.com",
    password: "hello",
  };

  type Inputs = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    getValues,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (data.password !== data.passwordConfirmation) {
      setError("passwordConfirmation", {
        type: "manual",
        message: "Passwords must match",
      });
    }

    const response = await registerUser({
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      password: data.password,
      password_confirmation: data.passwordConfirmation,
    });

    // if (response === 200) {
    // if the response is ok
    //@ts-ignore
    if (response.ok) {
      router.push("/login");
    }
    // }
    //TODO
  };

  console.log({ errors });
  return (
    <>
      <Head>
        <title>Hedghehog Portal</title>
        <meta name="description" content="A window to the soul" />
      </Head>
      <main>
        <PageLayout>
          <Content>
            <LargeTitle role={"h1"}>Register New User</LargeTitle>
            <Panel>
              <form
                onSubmit={handleSubmit(onSubmit)}
                css={`
                  width: 100%;
                  padding: var(--spacing-lg) 0;
                `}
              >
                <Flex
                  direction={"column"}
                  align={"center"}
                  justify={"center"}
                  gap={"var(--spacing-md)"}
                  flex={1}
                >
                  <Input
                    label={"First Name"}
                    aria-label={"First Name"}
                    name={"firstName"}
                    register={register}
                    error={errors?.firstName?.message}
                    required
                  />
                  <Input
                    label={"Last Name"}
                    aria-label={"Last Name"}
                    name={"lastName"}
                    register={register}
                    error={errors?.lastName?.message}
                    required
                  />
                  <Input
                    label={"Email"}
                    aria-label={"Email"}
                    name="email"
                    register={register}
                    error={errors?.email?.message}
                    type={"email"}
                    required
                  />
                  <Input
                    label={"Password"}
                    aria-label={"Password"}
                    name={"password"}
                    register={register}
                    error={errors?.password?.message}
                    type={"password"}
                    required
                  />
                  <Input
                    label={"Password Confirmation"}
                    aria-label={"Password Confirmation"}
                    name={"passwordConfirmation"}
                    register={register}
                    error={errors?.passwordConfirmation?.message}
                    type={"password"}
                    required
                  />
                  <Button
                    css={`
                      margin-top: var(--spacing-md);
                    `}
                  >
                    Register
                  </Button>
                  <Footnote>
                    Already registered? Please <Link href="/login">log in</Link>
                  </Footnote>
                </Flex>
              </form>
            </Panel>
          </Content>
        </PageLayout>
      </main>
    </>
  );
}

// const Input = styled.input``;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 500px;
  box-sizing: border-box;
  @media (max-width: 480px) {
    min-width: auto;
    max-width: 400px;
    flex-direction: column;
  }
`;

const StyledIcon = styled.a`
  color: rgb(var(--text-color));
  &:hover {
    opacity: 0.6;
  }
`;

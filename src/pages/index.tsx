import Head from "next/head";
import { Body, Footnote, HeaderTitle, Headline, Subhead, Title2 } from "../components/Typography";
import { PageLayout } from "../components/Page";
import css, { styled } from "styled-components";
import { Flex } from "../components/Flex";
import { Button } from "../components/Button";
import { login, registerUser } from "../backend";
import { Panel } from "../components/Panel";
import { SubmitHandler, useForm } from "react-hook-form";
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
    console.log(data);
    if (data.password !== data.passwordConfirmation) {
      setError("passwordConfirmation", {
        type: "manual",
        message: "Passwords must match",
      });
      console.log("passwords don't match");
    }
    const emailRegex = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/;
    //TODO this doesn't quite work
    //See if you can just return the response from the back end as the error
    if (emailRegex.test(data.email)) {
      setError("email", {
        type: "manual",
        message: "Valid email required",
      });
    }

    const response = await registerUser({
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      password: data.password,
      password_confirmation: data.passwordConfirmation,
    });
    console.log({ response });
    // if (response === 200) {
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
            <Panel>
              <form
                onSubmit={handleSubmit(onSubmit)}
                css={`
                  width: 100%;
                `}
              >
                <Flex
                  direction={"column"}
                  align={"center"}
                  justify={"center"}
                  gap={"var(--spacing-md)"}
                  flex={1}
                >
                  <h1>Register New User</h1>
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
                  <Button>Register</Button>
                  <Button onClick={() => login(existingUserData)}>Login</Button>
                  <Button type={"submit"}>Test User</Button>
                  <Subhead>Already registered? Please log in</Subhead>
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

const Content = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    min-width: auto;
    flex-direction: column;
  }
`;

const StyledIcon = styled.a`
  color: rgb(var(--text-color));
  &:hover {
    opacity: 0.6;
  }
`;

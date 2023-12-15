import { PageLayout } from "../../components/Page";
import { Panel } from "../../components/Panel";
import { Content } from "..";
import { Button } from "../../components/Button";
import Link from "next/link";
import { Body, Headline, LargeTitle } from "../../components/Typography";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginResponse, ResponseError, login } from "../../backend";
import { Flex } from "../../components/Flex";
import { Input } from "../../components/Input";
import { useRouter } from "next/router";
import { validateEmail } from "../../utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import styled from "styled-components";

type Inputs = {
  email: string;
  password: string;
};

export default function Login() {
  const router = useRouter();
  let { from } = router.query;
  const showRegistrationSuccess = from === "register";
  const showLogOutSuccess = from === "logout";

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!validateEmail(data?.email)) {
      setError("email", {
        type: "manual",
        message: "Must be a valid email address",
      });
    } else {
      let response = await login({
        email: data.email,
        password: data.password,
      });
      let body: LoginResponse = await response.json();
      if (response.ok) {
        localStorage.setItem("token", body.token);
        router.push("/dashboard");
      } else {
        toast.error(body.data?.message);
      }
    }
  };

  return (
    <PageLayout>
      <Content>
        <LargeTitle role={"h1"}>Login</LargeTitle>
        <StyledPanel>
          {showRegistrationSuccess && (
            <SuccessMessage>Registration successful! Please log in</SuccessMessage>
          )}
          {showLogOutSuccess && <SuccessMessage>Logout successful!</SuccessMessage>}
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
              <Button
                css={`
                  margin-top: var(--spacing-md);
                `}
              >
                Login
              </Button>
              <FooterMessage>
                If you haven't already, please <Link href="/">register here</Link> to log in.
              </FooterMessage>
            </Flex>
          </form>
        </StyledPanel>
      </Content>
      <ToastContainer theme={"dark"} />
    </PageLayout>
  );
}

const StyledPanel = styled(Panel)`
  display: flex;
  flex-direction: column;
`;

const SuccessMessage = styled(Headline)`
  color: var(--button-text-color);
  text-align: center;
  max-width: 200px;
  align-self: center;
`;

const FooterMessage = styled(Body)`
  max-width: 200px;
  margin-bottom: var(--spacing-sm);
`;

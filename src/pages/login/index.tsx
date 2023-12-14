import { PageLayout } from "../../components/Page";
import { Panel } from "../../components/Panel";
import { Content } from "..";
import { Button } from "../../components/Button";
import Link from "next/link";
import { Footnote, LargeTitle } from "../../components/Typography";
import { SubmitHandler, useForm } from "react-hook-form";
import { login } from "../../backend";
import { Flex } from "../../components/Flex";
import { Input } from "../../components/Input";
import { useRouter } from "next/router";
import { Token } from "../../types";
import { validateEmail } from "../../utils";

export default function Login() {
  type Inputs = {
    email: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Inputs>();

  const router = useRouter();

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

      console.log(response);
      if (response.statusCode === 422) {
        console.log("422 :)");
        //toast
        // invalid credentials
      }
    }
    // if (response.token) {
    //   localStorage.setItem("token", response.token);
    //   router.push("/dashboard");
    // }
  };

  return (
    <PageLayout>
      <Content>
        <LargeTitle role={"h1"}>Login</LargeTitle>
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
                  margin: var(--spacing-md);
                `}
              >
                Login
              </Button>
              <Footnote>
                If you haven't already, please <Link href="/">register here</Link> to log in.
              </Footnote>
            </Flex>
          </form>
        </Panel>
      </Content>
    </PageLayout>
  );
}

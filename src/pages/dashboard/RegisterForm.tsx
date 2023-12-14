import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Flex } from "../../components/Flex";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { addNewUser } from "../../backend";
import { User } from "../../types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormInput {
  first_name: string;
  last_name: string;
  email: string;
}

interface Props {
  onClose: () => void;
  appendUser: (newUser: User) => void;
}

const RegisterForm = ({ onClose, appendUser }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const response = await addNewUser({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
    });
    if (response.ok) {
      appendUser(await response.json());
      toast("User added to last page");
      onClose();
    } else {
      toast.error("User not added");
    }
  };

  return (
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
          name="first_name"
          label="First Name"
          type="text"
          register={register}
          error={errors?.first_name?.message}
        />

        <Input
          name="last_name"
          label="Last Name"
          type="text"
          register={register}
          error={errors?.last_name?.message}
        />

        <Input
          name={"email"}
          label={"Email"}
          type="email"
          register={register}
          error={errors?.email?.message}
        />
        <Button
          css={`
            align-self: flex-end;
          `}
          aria-label={"button"}
          disabled={!isValid}
        >
          Add User
        </Button>
        <ToastContainer theme={"dark"} />
      </Flex>
    </form>
  );
};

export default RegisterForm;

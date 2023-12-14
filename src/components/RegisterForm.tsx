import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import { Flex } from "./Flex";
import { Input } from "./Input";
import { Button } from "./Button";
import { createUser } from "../backend";
import { CreateUserResponse } from "../types";

interface FormInput {
  first_name: string;
  last_name: string;
  email: string;
}

interface Props {
  onClose: () => void;
  appendUser: (newUser: any) => void;
  //TODO fix the type here ^
}

const RegisterForm = ({ onClose, appendUser }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const response = await createUser({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
    });
    if (response.ok) {
      //TODO add success toast
      appendUser(await response.json());
      onClose();
    } else {
      // failure toast
    }
    console.log(data);
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
          // register={register("email", {
          //   required: "Email is required",
          //   pattern: {
          //     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          //     message: "Invalid email address",
          //   },
          // })}
          register={register}
          error={errors?.email?.message}
        />
      </Flex>
      <Button aria-label={"button"}>Add User</Button>
    </form>
  );
};

export default RegisterForm;

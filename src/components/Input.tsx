import styled from "styled-components";
import { Flex } from "./Flex";
import { Footnote } from "./Typography";
import { forwardRef } from "react";
import { useForm } from "react-hook-form";

interface Props {
  label?: string;
  children?: React.ReactNode;
  name?: string;
  register?: any;
  required?: boolean;
}

export const Input = forwardRef<HTMLInputElement, Props>(({ label, name, register, required }) => {
  return (
    <Flex
      direction="column"
      css={`
        width: 100%;
      `}
    >
      <StyledLabel role="label">{label}</StyledLabel>
      <StyledInput {...register(name, { required })} />
    </Flex>
  );
});

const StyledInput = styled.input`
  padding: var(--spacing-sm);
  width: 100%;
  border: none;
  border-radius: 2px;
  box-sizing: border-box;
`;

const StyledLabel = styled(Footnote)`
  display: flex;
  align-self: flex-start;
  margin-bottom: var(--spacing-xxs);
`;

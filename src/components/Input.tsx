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
  error?: string;
  type?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, name, register, required, error, type }) => {
    return (
      <Flex
        direction="column"
        css={`
          width: 100%;
        `}
      >
        <StyledLabel role="label">
          {label}
          {required && "*"}
        </StyledLabel>
        <StyledInput type={type} {...register(name, { required: `${label} is required` })} />
        {error && <Error role="warning">{error}</Error>}
      </Flex>
    );
  }
);

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

const Error = styled(Footnote)`
  width: 100%;
  text-align: left;
  color: var(--error-color);
  margin-top: var(--spacing-xxs);
`;

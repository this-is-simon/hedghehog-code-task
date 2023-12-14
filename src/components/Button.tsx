import styled from "styled-components";

export const Button = styled.button`
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--skill-pill-color);
  border: none;
  cursor: pointer;
  border-radius: 9999px;
  color: white;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
  &:hover {
    opacity: 0.6;
  }
  &:active:not(:disabled) {
    transform: scale(0.9);
  }
`;

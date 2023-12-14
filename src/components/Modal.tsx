import React from "react";
import styled from "styled-components";
import { Panel } from "./Panel";
import { Button } from "./Button";
import { Flex } from "./Flex";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
const AddUserModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <ModalWrapper>
      <ModalContent>
        <h2>Add User</h2>
        {children}
        <Flex gap={"var(--spacing-sm)"} justify={"flex-end"}>
          {/* //TODO make the cancel button in the top right*/}
          <Button
            css={`
              background: var(--error-color);
            `}
            aria-label={"button"}
            onClick={onClose}
          >
            Cancel
          </Button>
          {/* <Button aria-label={"button"} onClick={onClose}>
            Add User
          </Button> */}
        </Flex>
      </ModalContent>
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled(Panel)`
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: black;
  width: 300px;
`;

export default AddUserModal;

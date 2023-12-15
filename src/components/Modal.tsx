import React from "react";
import styled from "styled-components";
import { Panel } from "./Panel";
import { Button } from "./Button";
import { Flex } from "./Flex";
import { FaWindowClose } from "react-icons/fa";
import { Headline } from "./Typography";

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
        <Headline
          css={`
            margin-bottom: var(--spacing-md);
          `}
          role={"h2"}
        >
          Add User
        </Headline>
        {children}
        <IconContainer onClick={onClose}>
          <FaWindowClose size={20} />
        </IconContainer>
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
  padding: var(--spacing-lg);
  width: 300px;
  position: relative;
`;

const IconContainer = styled.div`
  position: absolute;
  padding: var(--spacing-sm);
  margin: var(--spacing-sm);
  top: 0;
  right: 0;
  cursor: pointer;
  :hover {
    opacity: 0.6;
  }
`;

export default AddUserModal;

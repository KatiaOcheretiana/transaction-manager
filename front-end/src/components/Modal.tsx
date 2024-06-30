import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  ModalHeader,
  ModalBody,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";

type ModalDefaultProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
};

function ModalDefault({
  isOpen,
  onClose,
  title,
  children,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
}: ModalDefaultProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          {onConfirm && (
            <Button colorScheme="blue" mr={3} onClick={onConfirm}>
              {confirmText}
            </Button>
          )}
          <Button variant="ghost" onClick={onClose}>
            {cancelText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalDefault;

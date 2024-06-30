import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";
import { updateTransaction } from "../lib/transactions";
import { Transaction } from "../type";
import toast from "react-hot-toast";

type EditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedTransaction: Transaction | null;
};

function EditModal({ isOpen, onClose, selectedTransaction }: EditModalProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  useEffect(() => {
    if (selectedTransaction) {
      setSelectedStatus(selectedTransaction.status);
    }
  }, [selectedTransaction]);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
  };

  const queryClient = useQueryClient();

  const { mutateAsync: updateTransactionStatus } = useMutation(
    updateTransaction,
    {
      onSuccess: () => {
        toast.success("Transaction updated");
        queryClient.invalidateQueries("transactions"); // Refetch transactions
      },
      onError: (error) => {
        toast.error(`Error updating transaction: ${error}`);
      },
    }
  );

  // Function to submit the edited transaction
  const handleSubmit = async () => {
    if (!selectedTransaction) return;

    try {
      const updatedTransaction: Transaction = {
        ...selectedTransaction,
        status: selectedStatus,
      };

      await updateTransactionStatus(updatedTransaction);
      onClose();
    } catch (error) {
      toast.error(`Error updating transaction: ${error}`);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Transaction Status</ModalHeader>
        <ModalBody>
          <FormControl>
            <FormLabel>Select Status</FormLabel>
            <Select value={selectedStatus} onChange={handleStatusChange}>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </Select>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditModal;

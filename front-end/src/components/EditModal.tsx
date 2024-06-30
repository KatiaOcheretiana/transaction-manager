import React, { useEffect, useState } from "react";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";
import { updateTransaction } from "../lib/transactions";
import { Transaction } from "../type";
import toast from "react-hot-toast";
import ModalDefault from "./Modal";

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
    <ModalDefault
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Transaction Status"
      onConfirm={handleSubmit}
      confirmText="Save"
      cancelText="Cancel"
    >
      <FormControl>
        <FormLabel>Select Status</FormLabel>
        <Select value={selectedStatus} onChange={handleStatusChange}>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
        </Select>
      </FormControl>
    </ModalDefault>
  );
}

export default EditModal;

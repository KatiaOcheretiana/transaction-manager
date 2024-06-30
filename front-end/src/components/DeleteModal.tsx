import React from "react";
import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { deleteTransaction } from "../lib/transactions";
import ModalDefault from "./Modal";

type DeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  transactionToDelete: number | null;
};

function DeleteModal({
  isOpen,
  onClose,
  transactionToDelete,
}: DeleteModalProps) {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteTransactionMutate } = useMutation(
    (id: number) => deleteTransaction(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("transactions");
        toast.success("Transaction deleted successfully");
      },
      onError: (error) => {
        toast.error(`Error deleting transaction: ${error}`);
      },
    }
  );

  const confirmDelete = async () => {
    if (transactionToDelete !== null) {
      await deleteTransactionMutate(transactionToDelete);
      onClose();
    }
  };

  return (
    <ModalDefault
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Transaction"
      onConfirm={confirmDelete}
      confirmText="Yes, Delete"
      cancelText="Cancel"
    >
      Are you sure you want to delete this transaction?
    </ModalDefault>
  );
}

export default DeleteModal;

import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { parseCSV } from "../lib/parseCSV";
import { addTransaction } from "../lib/transactions";
import { Box, Button, Input } from "@chakra-ui/react";

const ImportTransactions = () => {
  const { register, handleSubmit } = useForm();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (transactions) => {
      for (const transaction of transactions) {
        await addTransaction(transaction);
      }
    },
    {
      onSuccess: () => queryClient.invalidateQueries("transactions"),
    }
  );

  const onSubmit = async (data) => {
    try {
      const file = data.file[0];
      const fileExtension = file.name.split(".").pop();
      if (fileExtension !== "csv") {
        alert("Please upload a valid CSV file.");
        return;
      }

      const transactions = await parseCSV(file);

      console.log(transactions);

      mutation.mutate(transactions);
    } catch (error) {
      console.error("Import failed: ", error);
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input type="file" {...register("file")} />
        <Button type="submit">Import</Button>
      </form>
    </Box>
  );
};

export default ImportTransactions;

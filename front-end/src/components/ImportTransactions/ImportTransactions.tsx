import React, { useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { parseCSV } from "../../lib/parseCSV";
import { addTransaction } from "../../lib/transactions";
import { Button } from "@chakra-ui/react";
import { Transaction } from "../../type";
import toast from "react-hot-toast";
import { Form, HiddenInput, InputField } from "./ImportTransactions.styled";

type FormData = {
  file: FileList;
};

const ImportTransactions: React.FC = () => {
  const { register, handleSubmit, setValue, trigger } = useForm<FormData>();

  // async operations
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mutation = useMutation(
    async (transactions: Transaction[]) => {
      for (const transaction of transactions) {
        await addTransaction(transaction);
      }
    },
    {
      onSuccess: () => queryClient.invalidateQueries("transactions"),
    }
  );

  // submit import / check validation
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const file = data.file[0];
      const fileExtension = file.name.split(".").pop();
      if (fileExtension !== "csv") {
        toast.error("Please upload a valid CSV file.");
        return;
      }

      const transactions: Transaction[] = (await parseCSV(
        file
      )) as Transaction[];

      mutation.mutate(transactions);
    } catch (error) {
      toast.error(`Import failed: ${error}`);
    }
  };

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setValue("file", event.target.files);
      trigger("file").then(() => handleSubmit(onSubmit)());
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputField>
        <HiddenInput
          type="file"
          {...register("file", { required: true })}
          accept=".csv"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <Button colorScheme="blue" width={160} onClick={handleImportClick}>
          Import
        </Button>
      </InputField>
    </Form>
  );
};

export default ImportTransactions;

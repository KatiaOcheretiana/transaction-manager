import React, { useState } from "react";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { Button, Checkbox, CheckboxGroup, VStack } from "@chakra-ui/react";
import { Transaction } from "../type";
import toast from "react-hot-toast";
import styled from "styled-components";

export const BoxGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const csvConfig = mkConfig({ useKeysAsHeaders: true });

type ExportTransactionsProps = {
  transactions: Transaction[];
};

const ExportTransactions: React.FC<ExportTransactionsProps> = ({
  transactions,
}) => {
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

  const allColumns =
    transactions.length > 0 ? Object.keys(transactions[0]) : [];

  const handleColumnChange = (selected: string[]) => {
    setSelectedColumns(selected);
  };

  const handleExport = () => {
    if (selectedColumns.length === 0) {
      toast.error("Please select at least one column to export.");
      return;
    }

    const filteredTransactions = transactions.map((transaction) => {
      const filteredTransaction: { [key: string]: any } = {};
      selectedColumns.forEach((column) => {
        filteredTransaction[column] = transaction[column as keyof Transaction];
      });
      return filteredTransaction;
    });

    const csv = generateCsv(csvConfig)(filteredTransactions);

    try {
      download(csvConfig)(csv);
    } catch (error) {
      toast.error("Export failed. Please try again.");
    }
  };

  return (
    <VStack align="start">
      <p>Choose wanted columns</p>
      <BoxGroup>
        <CheckboxGroup value={selectedColumns} onChange={handleColumnChange}>
          {allColumns.map((column) => (
            <Checkbox key={column} value={column}>
              {column}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </BoxGroup>
      <Button colorScheme="blue" width={160} onClick={handleExport}>
        Export
      </Button>
    </VStack>
  );
};

export default ExportTransactions;

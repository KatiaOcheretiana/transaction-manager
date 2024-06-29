import React from "react";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { Button } from "@chakra-ui/react";
import { Transaction } from "../type";

const csvConfig = mkConfig({ useKeysAsHeaders: true });

type ExportTransactionsProps = {
  transactions: Transaction[];
};

const ExportTransactions: React.FC<ExportTransactionsProps> = ({
  transactions,
}) => {
  if (!transactions || transactions.length === 0) {
    return <div>No transactions to export.</div>;
  }

  const csv = generateCsv(csvConfig)(transactions);

  const handleExport = () => {
    try {
      download(csvConfig)(csv);
    } catch (error) {
      alert("Export failed. Please try again.");
    }
  };

  return <Button onClick={handleExport}>Export</Button>;
};

export default ExportTransactions;

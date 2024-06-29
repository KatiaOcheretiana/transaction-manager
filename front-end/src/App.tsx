import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import ImportTransactions from "./components/ImportTransactions";
import TransactionTable from "./components/TransactionTable";
import Filter from "./components/Filter";
import { useQuery } from "react-query";
import { getTransactions } from "./lib/transactions";
import { Wrapper } from "./App.styled";
import { Transaction } from "./type";
import ExportTransactions from "./components/ExportTransactions ";

const App = () => {
  const {
    data: transactions,
    isLoading,
    error,
  } = useQuery("transactions", getTransactions);

  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    if (transactions) {
      const filteredData = transactions.filter((item: Transaction) => {
        const matchStatus =
          statusFilter === "all" || item.status === statusFilter;
        const matchType = typeFilter === "all" || item.type === typeFilter;
        return matchStatus && matchType;
      });
      setFilteredTransactions(filteredData);
    }
  }, [statusFilter, typeFilter, transactions]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading transactions</div>;

  const handleEdit = (transaction: Transaction) => {
    console.log("edit", transaction);
  };

  const handleDelete = (id: number) => {
    console.log("delete", id);
  };

  return (
    <Box p={4}>
      <Wrapper>
        <ImportTransactions />
        <ExportTransactions transactions={filteredTransactions} />
        <Filter
          statusFilter={statusFilter}
          typeFilter={typeFilter}
          setStatusFilter={setStatusFilter}
          setTypeFilter={setTypeFilter}
        />
      </Wrapper>

      <TransactionTable
        transactions={filteredTransactions}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </Box>
  );
};

export default App;

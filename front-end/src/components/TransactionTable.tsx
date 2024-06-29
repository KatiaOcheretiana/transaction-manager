import React from "react";
import { useQuery } from "react-query";
import { getTransactions } from "../lib/transactions";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const TransactionTable = () => {
  const {
    data: transactions,
    isLoading,
    error,
  } = useQuery("transactions", getTransactions);

  if (!transactions && isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading transactions</div>;
  if (transactions) {
    return (
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Type</Th>
            <Th>Status</Th>
            <Th>Client Name</Th>
            <Th>Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          {transactions.map((transaction) => (
            <Tr key={transaction.id}>
              <Td>{transaction.id}</Td>
              <Td>{transaction.type}</Td>
              <Td>{transaction.status}</Td>
              <Td>{transaction.clientName}</Td>
              <Td>{transaction.amount}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    );
  }
};

export default TransactionTable;

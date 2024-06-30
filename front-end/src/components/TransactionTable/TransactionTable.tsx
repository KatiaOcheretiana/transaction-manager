import React, { useState } from "react";
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure,
} from "@chakra-ui/react";
import { ActionWrapper, MyPaginate } from "./TransactionTable.styled";
import EditModal from "../EditModal";
import { Transaction } from "../../type";

type TransactionTablePropsType = {
  onDelete: (id: number) => void;
  currentPage: number;
  setCurrentPage: (data: number) => void;
  transactions: Transaction[];
};

const TransactionTable = ({
  onDelete,
  currentPage,
  setCurrentPage,
  transactions,
}: TransactionTablePropsType) => {
  // pagination
  const itemsPerPage = 10;

  const pageCount = Math.ceil(transactions.length / itemsPerPage);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentTransactions = transactions.slice(offset, offset + itemsPerPage);

  // selected transaction for editing
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  // Open modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      color="gray.500"
      fontWeight="semibold"
      letterSpacing="wide"
      fontSize="xs"
      ml="2"
      mt={10}
    >
      <Table variant="striped" size="sm">
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Status</Th>
            <Th>Type</Th>
            <Th>Client name</Th>
            <Th>Amount</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentTransactions.map((transaction) => (
            <Tr key={transaction.id}>
              <Td>{transaction.id}</Td>
              <Td>{transaction.status}</Td>
              <Td>{transaction.type}</Td>
              <Td>{transaction.clientName}</Td>
              <Td>{transaction.amount}</Td>
              <ActionWrapper>
                <Button
                  colorScheme="green"
                  opacity={0.6}
                  height={7}
                  onClick={() => {
                    setSelectedTransaction(transaction);
                    onOpen();
                  }}
                >
                  Edit
                </Button>
                <Button
                  colorScheme="red"
                  height={7}
                  opacity={0.6}
                  onClick={() => onDelete(transaction.id)}
                >
                  Delete
                </Button>
              </ActionWrapper>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <MyPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />

      {/* Modal for editing status */}
      <EditModal
        isOpen={isOpen}
        onClose={onClose}
        selectedTransaction={selectedTransaction}
      />
    </Box>
  );
};

export default TransactionTable;

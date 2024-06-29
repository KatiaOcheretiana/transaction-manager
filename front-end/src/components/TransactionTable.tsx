import React, { useState } from "react";
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import ReactPaginate from "react-paginate";
import { Transaction } from "../type";
import styled from "styled-components";

const MyPaginate = styled(ReactPaginate).attrs({
  activeClassName: "active",
})`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  list-style-type: none;
  padding: 0 5rem;

  li a {
    border-radius: 7px;
    padding: 0.1rem 1rem;
    border: gray 1px solid;
    cursor: pointer;
  }
  li.previous a,
  li.next a,
  li.break a {
    border-color: transparent;
  }
  li.active a {
    background-color: #0366d6;
    border-color: transparent;
    color: white;
    min-width: 32px;
  }
  li.disabled a {
    color: grey;
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }
`;

type TransactionTablePropsType = {
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: number) => void;
  transactions: Transaction[];
};

const TransactionTable = ({
  onEdit,
  onDelete,
  transactions,
}: TransactionTablePropsType) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const pageCount = Math.ceil(transactions.length / itemsPerPage);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentTransactions = transactions.slice(offset, offset + itemsPerPage);

  return (
    <Box>
      <Table>
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
              <Td>
                <Button onClick={() => onEdit(transaction)}>Edit</Button>
                <Button onClick={() => onDelete(transaction.id)}>Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <MyPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
    </Box>
  );
};

export default TransactionTable;

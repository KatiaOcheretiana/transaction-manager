import { Td } from "@chakra-ui/react";
import ReactPaginate from "react-paginate";
import styled from "styled-components";

export const ActionWrapper = styled(Td)`
  display: flex;
  gap: 20px;
  align-items: start;
  justify-content: start;
`;

export const MyPaginate = styled(ReactPaginate).attrs({
  activeClassName: "active",
})`
  display: flex;
  flex-direction: row;
  list-style-type: none;
  padding: 0 5rem;
  width: 140px;
  margin: 20px auto;
  padding: 0;

  li a {
    border-radius: 2px;
    padding: 0.1rem 1rem;
    border: gray 2px solid;
    cursor: pointer;
  }
  li.previous a,
  li.next a,
  li.break a {
    border-color: gray;
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

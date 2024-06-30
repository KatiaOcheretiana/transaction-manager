import axios from "axios";
import { Transaction } from "../type";

const API_URL = "http://localhost:3001/api";

export const getTransactions = async () => {
  const response = await axios.get(`${API_URL}/transactions`);
  return response.data;
};

export const addTransaction = async (transaction: Transaction) => {
  const response = await axios.post(`${API_URL}/transactions`, transaction);
  return response.data;
};

export const updateTransaction = async (transaction: Transaction) => {
  const response = await axios.put(
    `${API_URL}/transactions/${transaction.id}`,
    { status: transaction.status }
  );
  return response.data;
};

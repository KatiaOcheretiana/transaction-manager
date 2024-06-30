import { useEffect, useState } from "react";
import ImportTransactions from "./components/ImportTransactions/ImportTransactions";
import TransactionTable from "./components/TransactionTable/TransactionTable";
import Filter from "./components/Filter/Filter";
import { useQuery } from "react-query";
import { getTransactions } from "./lib/transactions";
import { BoxWrapper, Wrapper } from "./App.styled";
import { Transaction } from "./type";
import ExportTransactions from "./components/ExportTransactions ";
import { Toaster } from "react-hot-toast";

const App = () => {
  // load transaction data from db

  const {
    data: transactions,
    isLoading,
    error,
  } = useQuery("transactions", getTransactions);

  // states
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);

  // filter transactions by type/status
  useEffect(() => {
    if (transactions) {
      const filteredData = transactions.filter((item: Transaction) => {
        const matchStatus =
          statusFilter === "all" || item.status === statusFilter;
        const matchType = typeFilter === "all" || item.type === typeFilter;
        return matchStatus && matchType;
      });
      setCurrentPage(0);
      setFilteredTransactions(filteredData);
    }
  }, [statusFilter, typeFilter, transactions]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading transactions</div>;

  return (
    <BoxWrapper p={8}>
      <Toaster position="top-center" reverseOrder={false} />

      <ImportTransactions />
      <Wrapper>
        <Wrapper style={{ flexDirection: "row", alignItems: "center" }}>
          {transactions && transactions.length >= 1 && (
            <>
              <Filter
                statusFilter={statusFilter}
                typeFilter={typeFilter}
                setStatusFilter={setStatusFilter}
                setTypeFilter={setTypeFilter}
              />
              <ExportTransactions transactions={filteredTransactions} />
            </>
          )}
        </Wrapper>

        {transactions && transactions.length >= 1 && (
          <TransactionTable
            transactions={filteredTransactions}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </Wrapper>
    </BoxWrapper>
  );
};

export default App;

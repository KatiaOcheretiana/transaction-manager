import { Box, Heading } from "@chakra-ui/react";
import TransactionTable from "./components/TransactionTable";
import ImportTransactions from "./components/ImportTransactions";

const App = () => (
  <Box>
    <Heading as="h1" size="xl" mb="4">
      Transaction Management
    </Heading>
    <ImportTransactions />
    <TransactionTable />
  </Box>
);

export default App;

import { Select, Box } from "@chakra-ui/react";

type FilterPropsType = {
  statusFilter: string;
  typeFilter: string;
  setStatusFilter: (status: string) => void;
  setTypeFilter: (type: string) => void;
};

const Filter = ({
  statusFilter,
  typeFilter,
  setStatusFilter,
  setTypeFilter,
}: FilterPropsType) => {
  return (
    <Box>
      <Select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="all">All status</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
        <option value="Cancelled">Cancelled</option>
      </Select>
      <Select
        value={typeFilter}
        onChange={(e) => setTypeFilter(e.target.value)}
      >
        <option value="all">All types</option>
        <option value="Refill">Refill</option>
        <option value="Withdrawal">Withdrawal</option>
      </Select>
    </Box>
  );
};

export default Filter;

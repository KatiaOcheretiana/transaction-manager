# Transaction Manager

Transaction Manager is a React application for managing transactions. The application allows users to import a list of transactions from a CSV file, update transaction statuses, delete transactions, and export filtered transaction lists to CSV files.

## Tech Stack

- Frontend: React.js
- Backend: Node.js, better-sqlite3
- Libraries:
  export-to-csv;
  axios;
  papaparse;
  react-hot-toast;
  react-paginate;
  react-hook-form.
  - Styles:chakra-ui, styled-components

## Installation

1. Clone the repository:

```bash
git clone https://github.com/KatiaOcheretiana/transaction-manager
cd transaction-manager
```

### Front-end

1. Navigate to the backend directory:

```bash
cd transaction-manager/front-end
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open http://localhost:3000 with your browser to see the result.

### Back-end

1. Navigate to the backend directory:

```bash
cd transaction-manager/back-end
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
node server.js
```

4. Server is running on http://localhost:3001

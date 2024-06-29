import Papa from "papaparse";

export const parseCSV = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const transactions = results.data.map((row) => ({
          type: row.Type.trim(),
          status: row.Status.trim(),
          amount: parseFloat(row.Amount.replace("$", "")),
          clientName: row.ClientName.trim(),
        }));
        resolve(transactions);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};

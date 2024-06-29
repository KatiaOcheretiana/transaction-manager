const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/api/transactions", (req, res) => {
  try {
    const transactions = db.prepare("SELECT * FROM transactions").all();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/transactions", async (req, res) => {
  const { type, status, amount, clientName } = req.body;

  try {
    // Execute the insert statement
    const result = db
      .prepare(
        "INSERT INTO transactions (type, status, amount, clientName) VALUES (?, ?, ?, ?)"
      )
      .run(type, status, amount, clientName);

    // Construct the response object based on the result
    const insertedTransaction = {
      id: result.lastInsertRowid,
      type,
      status,
      amount,
      clientName,
    };

    console.log("Inserted transaction:", insertedTransaction);

    // Respond with the inserted transaction data
    res.json(insertedTransaction);
  } catch (error) {
    // Handle any errors that occur during the insert operation
    console.error("Error inserting transaction:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

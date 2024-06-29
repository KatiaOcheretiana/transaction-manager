import express from "express";
import cors from "cors";
import db from "./db";

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

app.post("/api/transactions", (req, res) => {
  const { type, status, amount, clientName } = req.body;
  try {
    const result = db
      .prepare(
        "INSERT INTO transactions (type, status, amount, clientName) VALUES (?, ?, ?, ?)"
      )
      .run(type, status, amount, clientName);
    res.json({ id: result.lastInsertRowid, type, status, amount, clientName });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

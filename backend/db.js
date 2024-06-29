const Database = require("better-sqlite3");
const db = new Database("transactions.db");

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT,
    status TEXT,
    amount REAL,
    clientName TEXT
  )
`
).run();

module.exports = db;

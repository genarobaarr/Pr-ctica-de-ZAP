const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'app.db');
const db = new sqlite3.Database(DB_PATH);

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE)");
  db.get("SELECT COUNT(*) AS c FROM users", (err, row) => {
    if (err) return;
    if (row && row.c === 0) {
      const seedSql = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8');
      db.exec(seedSql);
    }
  });
});

module.exports = db;
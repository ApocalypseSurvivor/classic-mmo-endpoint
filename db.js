import sqlite3 from "sqlite3";
import { open } from "sqlite";

const openDb = async () => {
  return open({
    filename: "./data.sqlite",
    driver: sqlite3.Database,
  });
};

const initializeDatabase = async () => {
  const db = await open({
    filename: "./data.sqlite",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      user_id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const users = await db.all("SELECT * FROM users");
  if (users.length === 0) {
    await db.run(
      "INSERT INTO users VALUES(1,'admin','$2a$08$Y4iwX1P2aGngvK46YzC3R.AR1b5OqpxI80.kEVNtDCbpC.eo5ntIa','admin@classic-mmo.game','2024-07-13 23:33:21'"
    );
  }

  return db;
};

export default openDb;

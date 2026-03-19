// src/db/schema.ts
// SQLite schema initialization using bun:sqlite

import { Database } from "bun:sqlite";

export function initDb(path: string): Database {
  const db = new Database(path, { create: true });

  db.run("PRAGMA journal_mode=WAL");

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      phone TEXT PRIMARY KEY,
      privy_wallet_id TEXT NOT NULL UNIQUE,
      address TEXT NOT NULL UNIQUE,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      from_phone TEXT NOT NULL,
      to_phone TEXT NOT NULL,
      amount TEXT NOT NULL,
      tx_hash TEXT,
      status TEXT NOT NULL DEFAULT 'pending',
      error TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (from_phone) REFERENCES users(phone),
      FOREIGN KEY (to_phone) REFERENCES users(phone)
    )
  `);

  return db;
}

// src/db/users.ts
// User CRUD — maps phone numbers to Privy wallets

import type { Database } from "bun:sqlite";

export interface User {
  phone: string;
  privy_wallet_id: string;
  address: string;
  created_at: string;
}

export function getUser(db: Database, phone: string): User | null {
  return db.query<User, [string]>(
    "SELECT * FROM users WHERE phone = ?"
  ).get(phone);
}

export function getUserByAddress(db: Database, address: string): User | null {
  return db.query<User, [string]>(
    "SELECT * FROM users WHERE address = ?"
  ).get(address);
}

export function createUser(
  db: Database,
  phone: string,
  privyWalletId: string,
  address: string
): User {
  db.run(
    "INSERT INTO users (phone, privy_wallet_id, address) VALUES (?, ?, ?)",
    [phone, privyWalletId, address]
  );
  return getUser(db, phone)!;
}

export function getAllUsers(db: Database): User[] {
  return db.query<User, []>("SELECT * FROM users").all();
}

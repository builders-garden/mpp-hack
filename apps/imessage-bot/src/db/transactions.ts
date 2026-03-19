// src/db/transactions.ts
// Transaction log CRUD

import type { Database } from "bun:sqlite";

export interface Transaction {
  id: number;
  from_phone: string;
  to_phone: string;
  amount: string;
  tx_hash: string | null;
  status: string;
  error: string | null;
  created_at: string;
}

export function logTransaction(
  db: Database,
  fromPhone: string,
  toPhone: string,
  amount: string
): number {
  const result = db.run(
    "INSERT INTO transactions (from_phone, to_phone, amount, status) VALUES (?, ?, ?, 'pending')",
    [fromPhone, toPhone, amount]
  );
  return Number(result.lastInsertRowid);
}

export function updateTransaction(
  db: Database,
  id: number,
  update: { txHash?: string; status?: string; error?: string }
): void {
  const sets: string[] = [];
  const vals: (string | number)[] = [];

  if (update.txHash !== undefined) {
    sets.push("tx_hash = ?");
    vals.push(update.txHash);
  }
  if (update.status !== undefined) {
    sets.push("status = ?");
    vals.push(update.status);
  }
  if (update.error !== undefined) {
    sets.push("error = ?");
    vals.push(update.error);
  }

  if (sets.length === 0) return;

  vals.push(id);
  db.run(`UPDATE transactions SET ${sets.join(", ")} WHERE id = ?`, vals);
}

export function getTransactionsForUser(
  db: Database,
  phone: string,
  limit: number = 5
): Transaction[] {
  return db.query<Transaction, [string, string, number]>(
    "SELECT * FROM transactions WHERE from_phone = ? OR to_phone = ? ORDER BY created_at DESC LIMIT ?",
  ).all(phone, phone, limit);
}

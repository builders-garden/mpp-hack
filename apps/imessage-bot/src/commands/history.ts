// src/commands/history.ts

import type { Database } from "bun:sqlite";
import { getTransactionsForUser } from "../db/transactions";

export function handleHistory(db: Database, phone: string): string {
  const txs = getTransactionsForUser(db, phone, 5);

  if (txs.length === 0) {
    return "No transactions yet. Send your first payment with: send $5 to +1234567890";
  }

  const lines = txs.map((tx) => {
    const direction = tx.from_phone === phone ? "Sent" : "Received";
    const other = tx.from_phone === phone ? tx.to_phone : tx.from_phone;
    const status = tx.status === "confirmed" ? "" : ` (${tx.status})`;
    return `${direction} $${tx.amount} ${direction === "Sent" ? "to" : "from"} ${other}${status}`;
  });

  return ["Recent transactions:", "", ...lines].join("\n");
}

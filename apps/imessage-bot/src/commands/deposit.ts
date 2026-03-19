// src/commands/deposit.ts

import type { User } from "../db/users";

export function handleDeposit(user: User): string {
  return [
    "Your deposit address (Tempo network):",
    "",
    user.address,
    "",
    "Send PathUSD to this address to fund your account.",
    "Faucet (testnet): https://docs.tempo.xyz/quickstart/faucet",
  ].join("\n");
}

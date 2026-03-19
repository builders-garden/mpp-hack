// src/commands/help.ts

export function handleHelp(): string {
  return [
    "iMessage Pay — Commands:",
    "",
    "send $5 to +1234567890 — Send PathUSD to someone",
    "ask <question> — Ask AI (paid via MPP from your balance)",
    "balance — Check your PathUSD balance",
    "deposit — Get your wallet address to receive funds",
    "history — View recent transactions",
    "help — Show this message",
  ].join("\n");
}

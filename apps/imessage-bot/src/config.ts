// src/config.ts
// Central configuration — env vars + constants

function required(name: string): string {
  const val = process.env[name];
  if (!val) throw new Error(`Missing required env var: ${name}`);
  return val;
}

function optional(name: string, fallback: string): string {
  return process.env[name] || fallback;
}

export const config = {
  privy: {
    appId: required("PRIVY_APP_ID"),
    appSecret: required("PRIVY_APP_SECRET"),
  },
  treasury: {
    walletId: process.env.TREASURY_WALLET_ID || "",
    address: (process.env.TREASURY_ADDRESS || "") as `0x${string}`,
  },
  mpp: {
    serviceUrl: optional(
      "MPP_SERVICE_URL",
      "https://openai.mpp.tempo.xyz/v1/chat/completions"
    ),
    model: optional("MPP_MODEL", "gpt-4o"),
  },
  botPhone: process.env.BOT_PHONE || "",
  dbPath: optional("DB_PATH", "imessage-pay.db"),
} as const;

// PathUSD token address on Tempo
export const PATHUSD_ADDRESS =
  "0x20c0000000000000000000000000000000000000" as const;

// Tempo CAIP-2 identifiers for Privy
export const TEMPO_TESTNET_CAIP2 = "eip155:42431";
export const TEMPO_MAINNET_CAIP2 = "eip155:4217";

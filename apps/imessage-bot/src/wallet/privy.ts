// src/wallet/privy.ts
// Privy SDK: wallet creation + viem account adapter
//
// Uses createViemAccount from @privy-io/node/viem — this is the official
// Privy adapter that bridges server wallets to viem's Account interface.
// See: https://docs.privy.io/recipes/evm/tempo

import { PrivyClient } from "@privy-io/node";
import { createViemAccount } from "@privy-io/node/viem";
import type { LocalAccount } from "viem/accounts";
import { config } from "../config";

let privyClient: PrivyClient | null = null;

export function getPrivyClient(): PrivyClient {
  if (!privyClient) {
    privyClient = new PrivyClient({
      appId: config.privy.appId,
      appSecret: config.privy.appSecret,
    });
  }
  return privyClient;
}

export interface PrivyWallet {
  id: string;
  address: string;
}

/**
 * Create a new Ethereum wallet via Privy.
 * Each user gets their own server-managed wallet.
 * Works on any EVM chain including Tempo.
 */
export async function createUserWallet(): Promise<PrivyWallet> {
  const privy = getPrivyClient();
  const wallet = await privy.wallets().create({ chain_type: "ethereum" });
  return {
    id: wallet.id,
    address: wallet.address,
  };
}

/**
 * Get a viem-compatible LocalAccount backed by a Privy server wallet.
 * This account can be used with:
 *   - viem wallet clients (for P2P transfers via tempoActions)
 *   - mppx (for MPP-paid service consumption)
 */
export function getViemAccount(
  walletId: string,
  address: `0x${string}`
): LocalAccount {
  const privy = getPrivyClient();
  return createViemAccount(privy, { walletId, address });
}

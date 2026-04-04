"use client";

import { useBalance } from "wagmi";
import { intuitionChain } from "./config";

export function useWalletBalance(address: string | null) {
  const { data, isLoading, refetch } = useBalance({
    address: address as `0x${string}` | undefined,
    chainId: intuitionChain.id,
    query: { enabled: !!address, refetchInterval: (query) => {
      const bal = query.state.data ? parseFloat(query.state.data.formatted) : 0;
      return bal === 0 ? 1_000 : 10_000;
    }},
  });

  const value = data ? parseFloat(data.formatted) : 0;
  const formatted = data
    ? `${value.toFixed(2)} ${data.symbol}`
    : "0 TRUST";

  return { balance: data, value, formatted, isLoading, refetch };
}

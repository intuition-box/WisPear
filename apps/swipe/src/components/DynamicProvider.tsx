"use client";

import { type ReactNode } from "react";
import { WalletProvider } from "@wispr/wallet";

export function DynamicProvider({ children }: { children: ReactNode }) {
  return <WalletProvider>{children}</WalletProvider>;
}

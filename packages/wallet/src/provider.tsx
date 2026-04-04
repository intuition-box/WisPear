"use client";

import { type ReactNode } from "react";
import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

interface WalletProviderProps {
  children: ReactNode;
  environmentId?: string;
}

export function WalletProvider({ children, environmentId }: WalletProviderProps) {
  const envId = environmentId ?? process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID ?? "36dd1aa9-d136-4506-ad6b-12535d4a3ce3";

  return (
    <DynamicContextProvider
      settings={{
        environmentId: envId,
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      {children}
    </DynamicContextProvider>
  );
}

export { DynamicWidget };

"use client";

import { type ReactNode } from "react";
import { DynamicProvider } from "./DynamicProvider";
import { InstallBanner } from "./InstallBanner";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <DynamicProvider>
      {children}
      <InstallBanner />
    </DynamicProvider>
  );
}

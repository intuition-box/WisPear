"use client";

import { useState } from "react";
import { Button } from "@wispr/ui";
import type { WalletConnection } from "@wispr/wallet";

interface StakeModalProps {
  wallet: WalletConnection;
  termId: string;
  atomName: string;
  onClose: () => void;
}

export function StakeModal({ wallet, termId, atomName, onClose }: StakeModalProps) {
  const [amount, setAmount] = useState("0.001");
  const [staking, setStaking] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStake = async () => {
    if (!wallet.multiVault || !wallet.address) return;

    setStaking(true);
    setError(null);
    setTxHash(null);

    try {
      const { ethers } = await import("ethers");
      const value = ethers.parseEther(amount);

      const tx = await wallet.multiVault.deposit(
        wallet.address,
        termId,
        1,
        0,
        { value },
      );

      setTxHash(tx.hash);
      await tx.wait();
    } catch (err: unknown) {
      console.error("Stake failed:", err);
      setError(
        err instanceof Error ? err.message.split("(")[0].trim() : "Transaction failed",
      );
    } finally {
      setStaking(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-surface border border-border rounded-2xl p-6 w-[400px] max-w-[90vw] flex flex-col gap-5 shadow-[0_16px_48px_rgba(0,0,0,0.4)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-text-primary">
            Stake $TRUST on {atomName}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-surface-2 border border-border flex items-center justify-center text-text-muted hover:text-text-primary hover:border-border-light transition-all"
          >
            ✕
          </button>
        </div>

        {/* Amount input */}
        <div className="flex flex-col gap-2">
          <label className="text-[12px] text-text-muted uppercase tracking-wider">
            Amount (TRUST)
          </label>
          <input
            type="number"
            step="0.001"
            min="0.001"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={staking}
            className="px-3 py-2.5 rounded-lg bg-surface-2 border border-border text-text-primary text-[14px] font-mono outline-none focus:border-pear transition-colors disabled:opacity-50"
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-[13px] text-red-400">{error}</p>
        )}

        {/* Success */}
        {txHash && (
          <p className="text-[13px] text-pear">
            Staked!{" "}
            <a
              href={`https://explorer.intuition.systems/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              View tx ↗
            </a>
          </p>
        )}

        {/* Confirm button */}
        <Button
          variant="primary"
          size="lg"
          onClick={handleStake}
          disabled={staking || !amount || Number(amount) <= 0}
          style={{
            borderRadius: "12px",
            background: staking ? "#666" : "#d4ff47",
            color: "#06070f",
            border: "none",
            fontWeight: 700,
            fontSize: "14px",
          }}
        >
          {staking ? "Staking..." : `Stake ${amount} $TRUST`}
        </Button>
      </div>
    </div>
  );
}

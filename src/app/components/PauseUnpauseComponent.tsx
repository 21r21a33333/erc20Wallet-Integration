// components/PauseUnpauseComponent.tsx
"use client";
import * as React from "react";
import {
  type BaseError,
  useWaitForTransactionReceipt,
  useWriteContract,
  useReadContract,
} from "wagmi";
import abi from "./abi"; // Adjust the path to your ABI file as needed
import { toast } from "react-toastify";
import Heading from "./Heading";

export function PauseUnpauseComponent() {
  const { data: isPaused, refetch } = useReadContract({
    address: "0x9Ec1206011937A39F050442fD9Da39C76946bb99",
    abi,
    functionName: "paused",
  });

  React.useEffect(() => {
    refetch();
  }, [isPaused]);

  const { data: hash, error, isPending, writeContract } = useWriteContract();

  async function togglePause() {
    try {
      writeContract({
        address: "0x9Ec1206011937A39F050442fD9Da39C76946bb99",
        abi,
        functionName: isPaused ? "unpause" : "pause",
      });
    } catch (err) {
      console.error("Error writing contract:", err);
    }
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  React.useEffect(() => {
    if (isConfirmed) {
      //   onToggleConfirmed(!isPaused);
      toast.success(
        `Contract ${isPaused ? "unpaused" : "paused"} successfully!`
      );
    }
  }, [isConfirmed]); // Depend only on isConfirmed

  return (
    <div className="container">
      <Heading title="Pause And UnPause" />
      <button
        disabled={isPending}
        onClick={togglePause}
        className="button bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        {isPending
          ? "Confirming..."
          : isPaused
          ? "Unpause Contract"
          : "Pause Contract"}
      </button>
      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && <div>Waiting for confirmation...</div>}
      {isConfirmed && <div>Transaction confirmed.</div>}
      {error && (
        <div>Error: {(error as BaseError).shortMessage || error.message}</div>
      )}
    </div>
  );
}

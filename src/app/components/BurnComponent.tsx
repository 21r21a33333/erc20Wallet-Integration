// components/BurnComponent.tsx
"use client";
import * as React from "react";
import {
  type BaseError,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import abi from "./abi"; // Adjust the path to your ABI file as needed
import { toast } from "react-toastify";
import Heading from "./Heading";

export function BurnComponent({
  onMintConfirmed,
}: {
  onMintConfirmed: () => void;
}) {
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const amountString = formData.get("amount") as string; // Amount of tokens to burn
    const amount = BigInt(amountString); // Convert amount to BigInt

    // Log the values to check for correctness
    console.log("Amount to burn:", amount);

    try {
      writeContract({
        address: "0x9Ec1206011937A39F050442fD9Da39C76946bb99",
        abi,
        functionName: "burn",
        args: [amount],
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
      onMintConfirmed();
      toast.success("Tokens burned successfully!");
    }
  }, [isConfirmed]); // Depend only on isConfirmed

  return (
    <div className="container">
      <Heading title="BurnTokens" />
      <form onSubmit={submit}>
        <div className="mb-6">
          <label
            htmlFor="amount"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Amount to Burn
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="1000000000000000000" // Example: 1 token with 18 decimals
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <button
          disabled={isPending}
          type="submit"
          className="button bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          {isPending ? "Confirming..." : "Burn"}
        </button>
        {hash && <div>Transaction Hash: {hash}</div>}
        {isConfirming && <div>Waiting for confirmation...</div>}
        {isConfirmed && <div>Transaction confirmed.</div>}
        {error && (
          <div>Error: {(error as BaseError).shortMessage || error.message}</div>
        )}
      </form>
    </div>
  );
}

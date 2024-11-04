// components/AllowanceComponent.tsx
"use client";
import * as React from "react";
import { type BaseError, useReadContract } from "wagmi";
import abi from "./abi"; // Adjust the path to your ABI file as needed
import { toast } from "react-toastify";
import Heading from "./Heading";

export function AllowanceComponent() {
  const [owner, setOwner] = React.useState<string>("");
  const [spender, setSpender] = React.useState<string>("");
  const [allowance, setAllowance] = React.useState<string | null>(null);
  const {
    data,
    isLoading: isLoadingBalance,
    error,
    refetch: refetchBalance,
  } = useReadContract({
    address: "0x9Ec1206011937A39F050442fD9Da39C76946bb99",
    abi,
    functionName: "allowance",
    args: [owner, spender],
  });

  React.useEffect(() => {
    if (data) {
      setAllowance(data.toString()); // Convert BigNumber to string
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !/^0x[a-fA-F0-9]{40}$/.test(owner) ||
      !/^0x[a-fA-F0-9]{40}$/.test(spender)
    ) {
      toast.error("Invalid Ethereum address");
      return;
    }
    refetchBalance();
  };

  return (
    <div className="container">
      <Heading title="Check Allowances" />
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="owner"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Owner Address
          </label>
          <input
            type="text"
            id="owner"
            name="owner"
            placeholder="0x123...abc"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="spender"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Spender Address
          </label>
          <input
            type="text"
            id="spender"
            name="spender"
            placeholder="0x123...abc"
            value={spender}
            onChange={(e) => setSpender(e.target.value)}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="button bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Check Allowance
        </button>
      </form>
      {allowance !== null && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Allowance:</h3>
          {isLoadingBalance ? <p>Loading...</p> : <p>{allowance} Tokens</p>}
        </div>
      )}
      {error && (
        <div className="mt-4 text-red-500">
          Error: {(error as unknown as BaseError).shortMessage || error.message}
        </div>
      )}
    </div>
  );
}

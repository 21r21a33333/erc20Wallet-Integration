"use client";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Heading from "./Heading";

interface Transaction {
  blockNum: string;
  hash: string;
  from: string;
  to: string;
  value: string;
}

export default function TransactionHistory({
  refreshKey,
}: {
  refreshKey: boolean;
}) {
  const { address, isConnected } = useAccount();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const apiKey = "sEh4mGFjhkeO7nzf_VbCWhNU7e8MnL1V"; // Replace with your Alchemy API key

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      const data = JSON.stringify({
        jsonrpc: "2.0",
        id: 0,
        method: "alchemy_getAssetTransfers",
        params: [
          {
            fromBlock: "0x0",
            fromAddress: address,
            category: ["erc20"],
            withMetadata: true,
          },
        ],
      });

      const baseURL = `https://eth-sepolia.g.alchemy.com/v2/${apiKey}`;
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: data,
      };

      try {
        const response = await fetch(baseURL, requestOptions);
        const result = await response.json();
        if (result.result) {
          setTransactions(result.result.transfers);
        } else {
          console.error("No transactions found");
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [apiKey, address, refreshKey]);

  return (
    <div className="container">
      <Heading title="Transactions History" />
      {loading ? (
        <p>Loading transactions...</p>
      ) : transactions.length > 0 ? (
        <ul>
          {transactions
            .slice()
            .reverse()
            .map((tx, index) => (
              <li
                key={index}
                className="mb-4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <p>
                  <strong>Block Number:</strong> {tx.blockNum}
                </p>
                <p>
                  <strong>Transaction Hash:</strong> {tx.hash}
                </p>
                <p>
                  <strong>From:</strong> {tx.from}
                </p>
                <p>
                  <strong>To:</strong> {tx.to}
                </p>
                <p>
                  <strong>Value:</strong> {parseFloat(tx.value) / 10 ** 18}
                </p>
              </li>
            ))}
        </ul>
      ) : (
        <p>No transactions found for this address.</p>
      )}
    </div>
  );
}

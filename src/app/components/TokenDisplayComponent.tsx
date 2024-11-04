// components/TokenDisplayComponent.tsx
"use client";
import * as React from "react";
import { type BaseError, useReadContract } from "wagmi";
import abi from "./abi"; // Adjust the path to your ABI file as needed
import Heading from "./Heading";

export function TokenDisplayComponent({ refreshKey }: { refreshKey: boolean }) {
  // Force a rerender when refreshKey changes by toggling a state
  const [refresh, setRefresh] = React.useState(false);

  // Fetch total minted tokens
  const {
    data: totalSupply,
    error: supplyError,
    refetch: totalSupplyRefetch,
  } = useReadContract({
    address: "0x9Ec1206011937A39F050442fD9Da39C76946bb99",
    abi,
    functionName: "totalSupply",
  });

  // Fetch token name
  const {
    data: tokenName,
    error: nameError,
    refetch: tokenNameRefetch,
  } = useReadContract({
    address: "0x9Ec1206011937A39F050442fD9Da39C76946bb99",
    abi,
    functionName: "name",
  });

  // Fetch token symbol
  const {
    data: tokenSymbol,
    error: symbolError,
    refetch: symbolRefetch,
  } = useReadContract({
    address: "0x9Ec1206011937A39F050442fD9Da39C76946bb99",
    abi,
    functionName: "symbol",
  });

  // Fetch token symbol
  const {
    data: decimals,
    error: decimalError,
    refetch: decimalRefetch,
  } = useReadContract({
    address: "0x9Ec1206011937A39F050442fD9Da39C76946bb99",
    abi,
    functionName: "decimals",
  });

  React.useEffect(() => {
    totalSupplyRefetch(); // Refetch balance when refreshKey changes
    tokenNameRefetch();
    symbolRefetch();
    decimalRefetch();

    setRefresh((prev) => !prev); // Toggle refresh to force rerender
  }, [refreshKey]);

  return (
    <div className="container">
      <Heading title="Token Info" />

      {/* Display Token Name */}
      <div className="mb-4">
        <strong>Token Name:</strong>{" "}
        {nameError ? (
          <span>Error fetching name</span>
        ) : (
          <span>{tokenName as string}</span>
        )}
      </div>

      {/* Display Token Symbol */}
      <div className="mb-4">
        <strong>Token Symbol:</strong>{" "}
        {symbolError ? (
          <span>Error fetching symbol</span>
        ) : (
          <span>{tokenSymbol as string}</span>
        )}
      </div>
      <div className="mb-4">
        <strong> Decimals:</strong>{" "}
        {decimalError ? (
          <span>Error fetching symbol</span>
        ) : (
          <span>{decimals as string}</span>
        )}
      </div>
      {/* Display Total Minted Tokens */}
      <div className="mb-4">
        <strong>Total Minted Tokens:</strong>{" "}
        {supplyError ? (
          <span>Error fetching total supply</span>
        ) : (
          <span>{totalSupply as string}</span>
        )}
      </div>

      {/* Display any errors */}
      {supplyError && (
        <div className="text-red-500">
          Supply Error:{" "}
          {(supplyError as unknown as BaseError).shortMessage ||
            supplyError.message}
        </div>
      )}
      {nameError && (
        <div className="text-red-500">
          Name Error:{" "}
          {(nameError as unknown as BaseError).shortMessage ||
            nameError.message}
        </div>
      )}
      {symbolError && (
        <div className="text-red-500">
          Symbol Error:{" "}
          {(symbolError as unknown as BaseError).shortMessage ||
            symbolError.message}
        </div>
      )}
    </div>
  );
}

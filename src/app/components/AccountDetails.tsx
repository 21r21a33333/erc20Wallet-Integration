import * as React from "react";
import { useAccount, useReadContract } from "wagmi";
import abi from "./abi"; // Adjust the path to your ABI file as needed
import Heading from "./Heading";

export function AccountDetails({ refreshKey }: { refreshKey: boolean }) {
  const { address, isConnected } = useAccount();

  // Force a rerender when refreshKey changes by toggling a state
  const [refresh, setRefresh] = React.useState(false);

  const {
    data: balance,
    isLoading: isLoadingBalance,
    error,
    refetch,
  } = useReadContract({
    address: "0x9Ec1206011937A39F050442fD9Da39C76946bb99",
    abi,
    functionName: "balanceOf",
    args: [address],
  });
  React.useEffect(() => {
    refetch(); // Refetch balance when refreshKey changes
    setRefresh((prev) => !prev); // Toggle refresh to force rerender
  }, [refreshKey]);

  if (!isConnected) {
    return <div>Please connect your wallet to view account details.</div>;
  }

  return (
    <div className="container">
      {refresh /* This is just to confirm the rerendering */}
      <Heading title={"Account Details"} />
      <p>Address: {address}</p>
      {isLoadingBalance ? (
        <p>Loading balance...</p>
      ) : error ? (
        <p>Error fetching balance: {error.message}</p>
      ) : (
        <p>Balance: {balance ? balance.toString() : "0"}</p>
      )}
    </div>
  );
}

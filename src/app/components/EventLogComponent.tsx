// components/EventLogComponent.tsx
"use client";
import * as React from "react";
import { watchContractEvent } from "@wagmi/core";
import abi from "./abi"; // Adjust the path to your ABI file as needed
import { config } from "@/app/wagmi"; // Ensure your config has the correct chain information

export function EventLogComponent() {
  const [transferEvents, setTransferEvents] = React.useState<any[]>([]);
  const [approvalEvents, setApprovalEvents] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Watch for the Transfer event
    const unwatchTransfer = watchContractEvent(config, {
      address: "0x9Ec1206011937A39F050442fD9Da39C76946bb99",
      abi,
      eventName: "Transfer",
      onLogs(logs) {
        setIsLoading(false); // Set loading to false once events are received
        console.log("New Transfer logs!", logs);
        setTransferEvents((prevEvents) => [
          ...prevEvents,
          ...logs.map((log) => ({
            from: log.args.from,
            to: log.args.to,
            value: log.args.value.toString(),
          })),
        ]);
      },
    });

    // Watch for the Approval event
    const unwatchApproval = watchContractEvent(config, {
      address: "0x9Ec1206011937A39F050442fD9Da39C76946bb99",
      abi,
      eventName: "Approval",
      onLogs(logs) {
        setIsLoading(false); // Set loading to false once events are received
        console.log("New Approval logs!", logs);
        setApprovalEvents((prevEvents) => [
          ...prevEvents,
          ...logs.map((log) => ({
            owner: log.args.owner,
            spender: log.args.spender,
            value: log.args.value.toString(),
          })),
        ]);
      },
    });

    // Cleanup function to unwatch events when the component unmounts
    return () => {
      unwatchTransfer();
      unwatchApproval();
    };
  }, []);

  return (
    <div className="container">
      <h2 className="text-xl font-bold mb-4">Event Log</h2>

      {isLoading ? (
        <p>Fetching latest events...</p>
      ) : (
        <>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Transfer Events</h3>
            {transferEvents.length > 0 ? (
              <ul className="list-disc pl-5">
                {transferEvents.map((event, index) => (
                  <li
                    key={index}
                    className="mb-4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                  >
                    <strong>Transfer:</strong> From {event.from} to {event.to}{" "}
                    of {event.value} tokens
                  </li>
                ))}
              </ul>
            ) : (
              <p>No Transfer events logged yet.</p>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Approval Events</h3>
            {approvalEvents.length > 0 ? (
              <ul className="list-disc pl-5">
                {approvalEvents.map((event, index) => (
                  <li
                    key={index}
                    className="mb-4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                  >
                    <strong>Approval:</strong> Owner {event.owner} approved{" "}
                    {event.spender} for {event.value} tokens
                  </li>
                ))}
              </ul>
            ) : (
              <p>No Approval events logged yet.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

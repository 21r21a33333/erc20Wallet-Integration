"use client";
import { useAccount } from "wagmi";

import { Account } from "./Account";
import { Connect } from "./Connect";
import { MintToken } from "./MintToken";
import { AccountDetails } from "./AccountDetails";
import { useEffect, useState } from "react";
import { TransferComponent } from "./TransferComponent";
import { ApproveComponent } from "./ApproveComponent";
import { AllowanceComponent } from "./AllowanceComponent";
import { TransferFromComponent } from "./TransferFromComponent";
import { BurnComponent } from "./BurnComponent";
import { BurnFromComponent } from "./BurnFromComponent";
import { PauseUnpauseComponent } from "./PauseUnpauseComponent";
import { TokenDisplayComponent } from "./TokenDisplayComponent";
import { EventLogComponent } from "./EventLogComponent";
import TransactionHistory from "./Transactions";
export function ConnectWallet() {
  const { isConnected } = useAccount();
  const [refresh, setRefresh] = useState(true);
  const handleMintConfirmed = () => {
    setRefresh((prev) => !prev); // Update state to trigger balance refresh
  };

  return (
    <div>
      <div className="container">{isConnected ? <Account /> : <Connect />}</div>
      <div>
        {isConnected ? (
          <div className="container">
            <AccountDetails
              refreshKey={refresh}
              // key={refresh ? "key-true" : "key-false"}
            />
            <TokenDisplayComponent
              refreshKey={refresh}
              // key={refresh ? "key-true" : "key-false"}
            />
            <MintToken onMintConfirmed={handleMintConfirmed} />
            <TransferComponent onMintConfirmed={handleMintConfirmed} />
            <ApproveComponent onMintConfirmed={handleMintConfirmed} />
            <AllowanceComponent />
            <TransferFromComponent onMintConfirmed={handleMintConfirmed} />
            <BurnComponent onMintConfirmed={handleMintConfirmed} />
            <BurnFromComponent onMintConfirmed={handleMintConfirmed} />
            <PauseUnpauseComponent />
            <TransactionHistory refreshKey={refresh} />
            <EventLogComponent />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

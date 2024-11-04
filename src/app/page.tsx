"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ConnectWallet } from "./components/ConnectWallet";
import { config } from "./wagmi";

const queryClient = new QueryClient();

export default function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <ConnectWallet />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

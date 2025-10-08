import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { mainnet } from "viem/chains";
import "./index.css";
import App from "./App.tsx";

import { PrivyProvider } from "@privy-io/react-auth";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrivyProvider
      appId={import.meta.env.VITE_PRIVY_APP_ID!}
      clientId={import.meta.env.VITE_PRIVY_CLIENT_ID!}
      config={{
        embeddedWallets: {
          ethereum: {
            createOnLogin: "users-without-wallets",
          },
        },
        loginMethods: ["email", "wallet"],
        defaultChain: mainnet,
        appearance: { walletChainType: "ethereum-only" },
      }}
    >
      <App />
    </PrivyProvider>
  </StrictMode>
);

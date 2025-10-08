import { useState, useMemo, useEffect } from "react";
import { useWallets, useSignTypedData } from "@privy-io/react-auth";

import Section from "../reusables/section";
import { showSuccessToast, showErrorToast } from "../ui/custom-toast";
import { workingTypedData } from "../data/working";
import { failingTypedData } from "../data/failing";
import { replaceTypedData } from "../data/replace";

type WalletInfo = {
  address: string;
  type: "ethereum" | "solana";
  name: string;
};

const WalletActions = () => {
  const { signTypedData } = useSignTypedData();
  const { wallets: walletsEvm } = useWallets();

  const allWallets = useMemo((): WalletInfo[] => {
    const evmWallets: WalletInfo[] = walletsEvm.map((wallet) => ({
      address: wallet.address,
      type: "ethereum" as const,
      name: wallet.address,
    }));

    return evmWallets;
  }, [walletsEvm]);

  const [selectedWallet, setSelectedWallet] = useState<WalletInfo | null>(null);
  const [regexString, setRegexString] = useState<string>("[1-7]");

  useEffect(() => {
    if (allWallets.length > 0 && !selectedWallet) {
      setSelectedWallet(allWallets[0]);
    }
  }, [allWallets, selectedWallet]);

  const isEvmWallet = selectedWallet?.type === "ethereum";

  const handleSignTypedData = async (
    typedData: typeof workingTypedData | typeof failingTypedData
  ) => {
    if (!isEvmWallet || !selectedWallet) {
      showErrorToast("Please select an Ethereum wallet");
      return;
    }
    try {
      const { signature } = await signTypedData(typedData, {
        address: selectedWallet?.address,
      });
      showSuccessToast(`Typed Data signed: ${signature.slice(0, 10)}...`);
    } catch (error) {
      console.log(error);
      showErrorToast("Failed to sign typed data");
    }
  };

  const availableActions = [
    {
      name: "Sign working",
      function: () => handleSignTypedData(workingTypedData),
      disabled: !isEvmWallet,
    },
    {
      name: "Sign failing",
      function: () => handleSignTypedData(failingTypedData),
      disabled: !isEvmWallet,
    },
    {
      name: "Sign regexp modified",
      function: () => {
        handleSignTypedData(replaceTypedData(new RegExp(regexString, "gm")));
      },
      disabled: !isEvmWallet,
    },
  ];

  return (
    <Section
      name="Wallet actions"
      description={
        "Sign messages, typed data, raw hashes, and transactions, send transactions for both EVM and Solana wallets. Seamless experience with Privy embedded wallets."
      }
      filepath="src/components/sections/wallet-actions"
      actions={availableActions}
    >
      <div className="mb-4">
        <label
          htmlFor="wallet-select"
          className="block text-sm font-medium mb-2"
        >
          Select wallet:
        </label>
        <div className="relative">
          <select
            id="wallet-select"
            value={selectedWallet?.address || ""}
            onChange={(e) => {
              const wallet = allWallets.find(
                (w) => w.address === e.target.value
              );
              setSelectedWallet(wallet || null);
            }}
            className="w-full pl-3 pr-8 py-2 mb-3 border border-[#E2E3F0] rounded-md bg-white text-black focus:outline-none focus:ring-1 focus:ring-black appearance-none"
          >
            {allWallets.length === 0 ? (
              <option value="">No wallets available</option>
            ) : (
              <>
                <option value="">Select a wallet</option>
                {allWallets.map((wallet) => (
                  <option key={wallet.address} value={wallet.address}>
                    {wallet.address} [
                    {wallet.type === "ethereum" ? "ethereum" : "solana"}]
                  </option>
                ))}
              </>
            )}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        <label
          htmlFor="wallet-select"
          className="block text-sm font-medium mb-2"
        >
          Replace to zeros regexp without flags:
        </label>
        <input
          value={regexString}
          className="w-full pl-3 pr-8 py-2 border border-[#E2E3F0] rounded-md bg-white text-black focus:outline-none focus:ring-1 focus:ring-black appearance-none"
          onChange={(e) => setRegexString(e.target.value)}
        />
      </div>
    </Section>
  );
};

export default WalletActions;

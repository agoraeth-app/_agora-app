import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import React, { useState } from "react";

import SimpleStorageContract from "../contracts/SimpleStorage.json";

export const AppContext = React.createContext();

const ContextProvider = (props) => {
  const [contextState, setContextState] = useState({
    web3: "",
    userAccounts: { address: "", balance: "" },
    contract: "",
  });

  // Get network provider, web3, signer, and contract instance with ethers.js
  const web3 = new ethers.providers.Web3Provider(window.ethereum);
  const signer = web3.getSigner();
  const connectedContract = new ethers.Contract(
    "0x3d78B3495216A43C06feEF0396516D7E6dEA8Ccc",
    SimpleStorageContract.abi,
    signer
  );

  const initWeb3 = async () => {
    try {
      // Use web3 to get the user's accounts.
      const accounts = await web3.send("eth_requestAccounts", []);
      // Return users' wallet balance and store it parsed.
      const balance = await signer.getBalance();
      const parsedBalance = await ethers.utils.formatEther(balance);
      // Set web3, accounts, and contract to the app context
      setContextState({
        ...contextState,
        web3,
        userAccounts: { address: accounts[0], balance: parsedBalance },
        contract: connectedContract,
      });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  const initWeb3QR = async () => {
    try {
      //  Create WalletConnect Provider
      const provider = new WalletConnectProvider({
        infuraId: "92f59bd10a9642d8acafd94221c55ffb",
      });
      //  Enable session (triggers QR Code modal)
      await provider.enable();
      // Use web3 to get the user's accounts.
      const accounts = await web3.send("eth_requestAccounts", []);
      // Return users' wallet balance and store it parsed.
      const balance = await signer.getBalance();
      const parsedBalance = await ethers.utils.formatEther(balance);
      // Set web3, accounts, and contract to the app context
      setContextState({
        ...contextState,
        web3,
        userAccounts: { address: accounts[0], balance: parsedBalance },
        contract: connectedContract,
      });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  const refreshWeb3 = async () => {
    try {
      await initWeb3();
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  return (
    <>
      <AppContext.Provider
        value={{
          initWeb3,
          initWeb3QR,
          refreshWeb3,
          contextState,
        }}
      >
        {props.children}
      </AppContext.Provider>
    </>
  );
};

export default ContextProvider;

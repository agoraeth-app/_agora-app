import Web3 from "web3";
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
  const initWeb3 = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await new Web3(window.ethereum);
      // console.log(web)
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      console.log(accounts)
      // Return users' wallet balance and store it parsed.
      const balance = await web3.eth.getBalance(accounts[0]);
      const parsedBalance = await web3.utils.fromWei(balance, "ether");

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the app context
      setContextState({
        web3,
        userAccounts: { address: accounts[0], balance: parsedBalance },
        contract: instance,
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
      console.log("I am called");
      await provider.enable();

      // Get network provider and web3 instance.
      const web3 = await new Web3(provider);

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      console.log(accounts)

      // Return users' wallet balance and store it parsed.
      const balance = await web3.eth.getBalance(accounts[0]);
      const parsedBalance = await web3.utils.fromWei(balance, "ether");

      // Set web3, accounts, and contract to the app context
      setContextState({
        ...contextState,
        web3,
        userAccounts: { address: accounts[0], balance: parsedBalance },
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
      // Get network provider and web3 instance.
      const web3 = await new Web3(window.ethereum);

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Return users' wallet balance and store it parsed.
      const balance = await web3.eth.getBalance(accounts[0]);
      const parsedBalance = await web3.utils.fromWei(balance, "ether");

      // Set web3, accounts, and contract to the app context
      setContextState({
        ...contextState,
        web3,
        userAccounts: { address: accounts[0], balance: parsedBalance },
      });
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

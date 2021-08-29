import Web3 from "web3";
import React, { useState } from "react";

import SimpleStorageContract from "../contracts/SimpleStorage.json";

export const AppContext = React.createContext();

const ContextProvider = (props) => {
  const [contextState, setContextState] = useState({
    web3: "",
    accounts: "",
    contract: "",
  });

  const initWeb3 = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = window.addEventListener("load", async () => {
        if (window.ethereum) {
          const web3 = new Web3(window.ethereum);
          // Request account access if needed
          await window.ethereum.enable();
          // Accounts now exposed
        }
        // Legacy dapp browsers...
        else if (window.web3) {
          // Use Mist/MetaMask's provider.
          const web3 = window.web3;
        }
        // Fallback to localhost; use dev console port by default...
        else {
          const provider = new Web3.providers.HttpProvider(
            "http://127.0.0.1:8545"
          );
          const web3 = new Web3(provider);
        }
      });

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the app context
      setContextState({ web3, accounts, contract: instance });
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
          contextState,
        }}
      >
        {props.children}
      </AppContext.Provider>
    </>
  );
};

export default ContextProvider;

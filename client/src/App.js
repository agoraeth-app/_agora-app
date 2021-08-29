import React, { useEffect, useState } from "react";

import Modal from "./components/Modal/Modal";
import AppHeader from "./components/AppHeader/AppHeader";

import "./App.css";

import { AppContext } from "./context/index";

const App = () => {
  const [appState, setAppState] = useState({
    modalVisibility: false,
    newAccount: "",
  });

  useEffect(() => {
    window.ethereum.on("accountsChanged", (newAccounts) => {
      setAppState({ modalVisibility: true, newAccount: newAccounts[0] });
    });
  });

  const { newAccount } = appState;
  return (
    <AppContext.Consumer>
      {(context) => {
        const { initWeb3 } = context;
        const { modalVisibility } = appState;
        const { web3, userAccounts } = context.contextState;
        return (
          <div className="App h-screen bg-indigo-900">
            <AppHeader
              web3={web3}
              startWeb3={initWeb3}
              userAccount={userAccounts}
            />
            {modalVisibility ? (
              <Modal modalVisibility={modalVisibility}>
                <p>
                  We've noticed that you've changed accounts. Can you please
                  confirm which account you'd like to use?
                </p>
                <p1>{newAccount}</p1>
                <p1>{userAccounts.address}</p1>
              </Modal>
            ) : (
              ""
            )}
          </div>
        );
      }}
    </AppContext.Consumer>
  );
};

export default App;

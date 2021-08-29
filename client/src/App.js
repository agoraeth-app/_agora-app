import React, { useEffect } from "react";
// import SimpleStorageContract from "./contracts/SimpleStorage.json";

import "./App.css";

import { AppContext } from "./context/index";

const App = () => {
  useEffect(() => {});

  return (
    <AppContext.Consumer>
      {(context) => {
        const { web3 } = context.contextState;
        return (
          <div className="App">
            <h1>Good to Go!</h1>
            <p>Your Truffle Box is installed and ready.</p>
            <h2>Smart Contract Example</h2>
            <p>
              If your contracts compiled and migrated successfully, below will
              show a stored value of 5 (by default).
            </p>
            <p>
              Try changing the value stored on <strong>line 42</strong> of
              App.js.
            </p>
            <div>The stored value is: {web3}</div>
          </div>
        );
      }}
    </AppContext.Consumer>
  );
};

export default App;

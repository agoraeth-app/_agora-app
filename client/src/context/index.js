import React, { useState } from "react";

export const AppContext = React.createContext();

const ContextProvider = () => {
  const [contextState, setContextState] = useState({
    web3: "",
    accounts: "",
    contract: "",
  });

  return (
    <>
      <AppContext.Provider
        value={{
          contextState,
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    </>
  );
};

export default ContextProvider;

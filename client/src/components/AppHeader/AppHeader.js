import React from "react";

import shortenUserWalletAddress from "../../utils/shortenUserWalletAddress";

const AppHeader = (props) => {
  const { web3, startWeb3, userAccount } = props;
  return (
    <>
      <header className="w-full flex flex-row justify-between">
        <div className="text-white p-2 m-4 font-extrabold">Logo</div>
        {web3 ? (
          <>
            <button className="p-2 m-4 rounded-2xl bg-green-500">
              {shortenUserWalletAddress(userAccount.address)}
            </button>
          </>
        ) : (
          <>
            <button
              className="p-2 m-4 rounded-2xl bg-green-500"
              onClick={() => startWeb3()}
            >
              Connect wallet
            </button>
          </>
        )}
      </header>
    </>
  );
};

export default AppHeader;

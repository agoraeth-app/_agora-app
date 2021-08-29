const shortenUserWalletAddress = (address) => {
  return address.substr(0, 4) + "..." + address.substr(address.length - 4, 4);
};

export default shortenUserWalletAddress;

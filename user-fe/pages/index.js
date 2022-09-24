// Setup: npm install alchemy-sdk
import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";

const config = {
  apiKey: process.env.APIKEY,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(config);

const Home = () => {
  const [nftsOwned, setNftsOwned] = useState([])
  const [user, setUser] = useState(null)
  const getNFTs = async () => {
    // Get all NFTs
    const nfts = await alchemy.nft.getNftsForOwner(user);
    // Print NFTs
    setNftsOwned(nfts.ownedNfts)
    console.log('nftsOwned:', nftsOwned);
  };

  const getAccount = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    setUser(accounts[0]);
  }

  useEffect(() => {
    if (window?.ethereum && !user) {
      getAccount()
    }
  }, [])

  useEffect(() => {
    if (user) {
      getNFTs()
    }
  }, [user])
  
  
  return (
    <div>
      {nftsOwned}
    </div>
  )
}

export default Home
// Setup: npm install alchemy-sdk
import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import NFTCard from "../components/NFTCard";

const config = {
  apiKey: 'VXy6vw8_RAd7U-BNepjTh5_kAOi7g9rR',
  network: Network.MATIC_MUMBAI,
};
const alchemy = new Alchemy(config);

const Home = () => {
  const [nftsOwned, setNftsOwned] = useState([])
  const [user, setUser] = useState(null)
  const getNFTs = async () => {
    // Get all NFTs
    const nfts = await alchemy.nft.getNftsForOwner('0x2E04A678635A68e0B794Bc9F57ECd484c75451d6');
    console.log('nfts:', nfts);
    setNftsOwned(nfts.ownedNfts)
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
    <div className="m-10">
      {nftsOwned.map((nft, i) => (
        <NFTCard key={i} nft={nft} />
      ))}
    </div>
  )
}

export default Home
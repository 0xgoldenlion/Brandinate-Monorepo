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
  const dummyProducts = [
    {
      image: 'https://ipfs.io/ipfs/bafybeiar6miyaobqnyfrxjwbc3s7uenanmttjcqo2dg55533s6ftsuh4fu/gopro.png',
      name: 'HERO11 Black',
      brand: 'GoPro',
      description: 'Get incredible highlight videos sent to your phone automatically with the HERO11 Black. Its new, larger image sensor captures more of the scene with higher image quality, letting you instantly share vertical...',
    },
    {
      image: 'https://static.nike.com/a/images/t_prod_ss/w_960,c_limit,f_auto/zww68xpjqf1jmluv3rol/air-jordan-1-mid-fearless-blue-the-great-release-date.jpg',
      name: 'Air Jordan',
      brand: 'Nike',
      description: 'Before becoming a streetwear icon and a must-have for skateboarding. Dunk started his journey on American college parquets. The design became famous in 1985. when he debuted together with other color...',
    },
    {
      image: 'https://www.tustablas.com/2946/burton-instigator-flat-top-2018.jpg',
      name: 'Instigator Snowboard',
      brand: 'Burton',
      description: 'Get straight to the fun part. Enjoy a no-fuss feel with the Burton Instigator Snowboard, a board designed to help accelerate the learning curve and instigate a good time from your first moment on the mountain...',
    },
    
  ]
  const [nftsOwned, setNftsOwned] = useState([])
  const [user, setUser] = useState(null)
  const getNFTs = async () => {
    // Get all NFTs
    const nfts = await alchemy.nft.getNftsForOwner('0x2E04A678635A68e0B794Bc9F57ECd484c75451d6');
    // setNftsOwned(nfts.ownedNfts)
    setNftsOwned(dummyProducts)
    
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
      <div className="flex gap-5">
      {nftsOwned.map((nft, i) => (
        <NFTCard key={i} nft={nft} />
      ))}
      </div>
    </div>
  )
}

export default Home
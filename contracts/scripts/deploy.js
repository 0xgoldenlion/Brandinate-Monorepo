// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
const hre = require("hardhat");
const fs = require('fs');
require('dotenv').config;

async function main() {
  const Brandinate = await hre.ethers.getContractFactory("Brandinate");
  const brandinate = await Brandinate.deploy(process.env.TABLELAND_REGISTRY);
  await brandinate.deployed();

  console.log('Brandinate Address: ', brandinate.address);
  const addresses = `BRANDINATE_ADDRESS=${brandinate.address}`;
  fs.writeFileSync('.env.contracts', addresses);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

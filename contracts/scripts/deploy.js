// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  const TablelandTables = await hre.ethers.getContractFactory("TablelandTables");
  const tablelandTables = await TablelandTables.deploy();
  await tablelandTables.deployed();

  console.log('TablelandTables Address: ', tablelandTables.address);

  const Brandinate = await hre.ethers.getContractFactory("Brandinate");
  const brandinate = await Brandinate.deploy(tablelandTables.address);
  await brandinate.deployed();

  console.log('Brandinate Address: ', brandinate.address);

  const uri = await brandinate.metadataURI();
  console.log('URI', uri);

  const [owner] = await ethers.getSigners();
  console.log('Minting NFt to : ', owner.address);
  await brandinate.safeMint(owner.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

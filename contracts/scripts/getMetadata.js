// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
	const Brandinate = await hre.ethers.getContractFactory("Brandinate");
	const brandinate = await Brandinate.attach('0xdF2Ba44160BF4d5c9C64391664116CA7CdFc5950');

	const tokenURI = await brandinate.tokenURI(1);
	console.log('tokenURI', tokenURI);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});

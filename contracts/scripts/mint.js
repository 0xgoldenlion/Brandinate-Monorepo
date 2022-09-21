// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
const hre = require("hardhat");

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.contracts') });

async function main() {
	const Brandinate = await hre.ethers.getContractFactory("Brandinate");
	const brandinate = await Brandinate.attach(process.env.BRANDINATE_ADDRESS);

	const [owner] = await ethers.getSigners();
	console.log('Minting NFt to : ', owner.address);
	await brandinate.safeMint(owner.address);

	const ownerOf = await brandinate.ownerOf(1);
	console.log('ownerOf', ownerOf);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});

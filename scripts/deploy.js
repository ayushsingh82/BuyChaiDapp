const hre = require("hardhat");

async function main() {
  const chai = await hre.ethers.deployContract("chai"); // Deploy the contract


  console.log("Deployed contract address:", await chai.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

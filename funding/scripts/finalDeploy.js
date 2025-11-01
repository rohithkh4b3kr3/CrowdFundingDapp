const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const balance = await deployer.provider.getBalance(deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(balance), "ETH");

  // Get the contract factory
  const Funding = await hre.ethers.getContractFactory("Funding");

  console.log("Deploying contract...");
  const funding = await Funding.deploy(); // Add constructor args here if needed

  await funding.waitForDeployment();

  console.log("Contract deployed to:", await funding.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

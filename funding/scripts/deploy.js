const hre = require("hardhat");

async function getBalance(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.formatEther(balanceBigInt);
}

async function consoleBalance(addresses) {
  let counter = 0;
  for (const address of addresses) {
    console.log(`Address ${counter} balance:`, await getBalance(address));
    counter++;
  }
}

async function consoleMemos(memos) {
  for (const memo of memos) {
    const name = memo.name;
    const from = memo.from;
    const timestamp = memo.timestamp;
    const message = memo.message;
    console.log(`At ${timestamp}, ${name} (${from}): ${message}`);
  }
}

async function main() {
  const [owner, tipper, tipper2, tipper3] = await hre.ethers.getSigners();

  // ✅ Use "Funding" (contract name with capital F)
  const funding = await hre.ethers.deployContract("Funding");
  await funding.waitForDeployment(); // new ethers v6 syntax
  console.log("Funding deployed to:", await funding.getAddress());

  const addresses = [owner.address, tipper.address, tipper2.address, tipper3.address];
  console.log("== start ==");
  await consoleBalance(addresses);

  const amount = { value: hre.ethers.parseEther("1") };

  await funding.connect(tipper).fundMe("tipper1", "You're awesome!", amount);
  await funding.connect(tipper2).fundMe("tipper2", "Keep up the great work!", amount);
  await funding.connect(tipper3).fundMe("tipper3", "Happy to support you!", amount);

  console.log("== after funding ==");
  await consoleBalance(addresses);

  const memos = await funding.getMemos();
  console.log("== memos ==");
  await consoleMemos(memos);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

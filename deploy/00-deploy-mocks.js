const { developmentChains } = require("../helper-hardhat-config");
const { network } = require("hardhat");

const BASE_FEE = ethers.utils.parseEther("0.25"); // It costs 0.25 LINK per request.
const GAS_PRICE_LINK = 1e9; // Link per gas, doesn't matter for mock

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const args = [BASE_FEE, GAS_PRICE_LINK];

  if (developmentChains.includes(network.name)) {
    log("Local network detected! Deploying mocks...");
    await deploy("VRFCoordinatorV2Mock", {
      from: deployer,
      log: true,
      args,
    });
    log("Mock Deployed!");
    log("---------------------------------");
  }
};

module.exports.tags = ["all", "mocks"];

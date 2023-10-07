import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployAllContracts: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // Deploy ProjectProposal
  const projectProposal = await deploy("ProjectProposal", {
    from: deployer,
    args: [], // Constructor arguments
    log: true,
    autoMine: true,
  });

  // Deploy VotingContract
  const votingContract = await deploy("VotingContract", {
    from: deployer,
    args: [], // Constructor arguments
    log: true,
    autoMine: true,
  });

  // Deploy FundingContract
  const fundingContract = await deploy("FundingContract", {
    from: deployer,
    args: [votingContract.address], // Pass the VotingContract address as a constructor argument
    log: true,
    autoMine: true,
  });

  // More logic can be added here if needed
};

export default deployAllContracts;
deployAllContracts.tags = ["AllContracts"];
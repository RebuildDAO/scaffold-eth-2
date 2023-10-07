import { expect } from "chai";
import { ethers } from "hardhat";
import { ProjectProposal } from "../typechain-types";

describe("ProjectProposal", function () {
  let projectProposal: ProjectProposal;
  let owner: any;
  let addr1: any;
  let addrs: any;

  before(async () => {
    [owner, addr1, ...addrs] = await ethers.getSigners();
    const projectProposalFactory = await ethers.getContractFactory("ProjectProposal");
    projectProposal = (await projectProposalFactory.deploy()) as ProjectProposal;
    await projectProposal.deployed();
    console.log(addrs);
  });

  describe("Deployment", function () {
    it("Should deploy successfully", async function () {
      expect(await projectProposal.owner()).to.equal(owner.address);
    });
  });

  describe("createProposal", function () {
    it("Should allow owner to create a proposal", async function () {
      await projectProposal.createProposal("Name", "Description", "https://example.com/uri", 1000, "New York");
      const tokenId = 0;
      console.log("Token ID: ", tokenId.toString());

      expect(await projectProposal.names(tokenId)).to.equal("Name");
      expect(await projectProposal.descriptions(tokenId)).to.equal("Description");
      expect((await projectProposal.fundingGoals(tokenId)).toNumber()).to.equal(ethers.BigNumber.from(1000));

      expect(await projectProposal.locations(tokenId)).to.equal("New York");
    });

    it("Should not allow non-owner to create a proposal", async function () {
      await expect(
        projectProposal
          .connect(addr1)
          .createProposal("Name", "Description", "https://example.com/uri", 1000, "New York"),
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("doTransaction", function () {
    it("Should allow users to fund a proposal", async function () {
      await projectProposal.createProposal("Name", "Description", "https://example.com/uri", 1000, "New York");
      const tokenId = 0;
      await projectProposal.connect(addr1).doTransaction(tokenId, { value: 500 });
      expect(await projectProposal.fundsRaised(tokenId)).to.equal(500);
    });

    it("Should require the correct ether amount to be sent", async function () {
      await projectProposal.createProposal("Name", "Description", "https://example.com/uri", 1000, "New York");
      const tokenId = 0;
      await expect(projectProposal.connect(addr1).doTransaction(tokenId, { value: 500 })).to.be.ok;
    });
  });
});

import { useRef, useState } from "react";
import {
  useAnimationConfig,
  useScaffoldContract,
  useScaffoldContractRead,
} from "~~/hooks/scaffold-eth";
import dynamic from 'next/dynamic';


// Dynamically import MapComponent
const DynamicMapComponent = dynamic(
  () => import('../MapComponents'),
  { ssr: false } // This will load the component only on the client side
);

export const ContractData = () => {
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isRightDirection, setIsRightDirection] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLDivElement>(null);

  const { data: totalCounter } = useScaffoldContractRead({
    contractName: "ProjectProposal",
    functionName: "totalSupply"
  });

  const { data: currentProposals, isLoading: isProposalsLoading } = useScaffoldContractRead({
    contractName: "ProjectProposal",
    functionName: "getAllProposals"
  });

  /*

  useScaffoldEventSubscriber({
    contractName: "YourContract",
    eventName: "GreetingChange",
    listener: logs => {
      logs.map(log => {
        const { greetingSetter, value, premium, newGreeting } = log.args;
        console.log("📡 GreetingChange event", greetingSetter, value, premium, newGreeting);
      });
    },
  });

  const {
    data: myGreetingChangeEvents,
    isLoading: isLoadingEvents,
    error: errorReadingEvents,
  } = useScaffoldEventHistory({
    contractName: "YourContract",
    eventName: "GreetingChange",
    fromBlock: process.env.NEXT_PUBLIC_DEPLOY_BLOCK ? BigInt(process.env.NEXT_PUBLIC_DEPLOY_BLOCK) : 0n,
    filters: { greetingSetter: address },
    blockData: true,
  });

  console.log("Events:", isLoadingEvents, errorReadingEvents, myGreetingChangeEvents);

  */
  const { data: yourContract } = useScaffoldContract({ contractName: "ProjectProposal" });
  console.log("yourContract: ", yourContract);

  const { showAnimation } = useAnimationConfig(totalCounter);

  const showTransition = transitionEnabled && !!currentProposals && !isProposalsLoading; // && !isGreetingLoading;

  console.log(currentProposals);

  let proposalsList = currentProposals?.map((proposal: any) => (
    <div key={proposal.id} className="proposal-item">
      <h3>{proposal.name}</h3>
      {proposal.description}
    </div>
  ));

  return (
    <div className="flex flex-col justify-center items-center bg-black py-10 px-5 sm:px-0 lg:py-auto max-w-[100vw]">
      <div style={{ width: '600px', height: '400px' }}>
        <DynamicMapComponent proposals={undefined}/>
      </div>
      <div
        className={`flex flex-col max-w-md bg-base-200 bg-opacity-70 rounded-2xl shadow-lg px-5 py-4 w-full ${showAnimation ? "animate-zoom" : ""
          }`}
      >
        <div className="flex justify-between w-full">
          <button
            className="btn btn-circle btn-ghost relative bg-center bg-black bg-no-repeat"
            onClick={() => { 
              setTransitionEnabled(!transitionEnabled);
            }}
          >
            <div
              className={`absolute inset-0 bg-center bg-no-repeat bg-black transition-opacity ${
                transitionEnabled ? "opacity-0" : "opacity-100"
                }`}
            />
          </button>
          <div className="bg-secondary border border-primary rounded-xl flex">
            <div className="p-2 py-1 border-r border-primary flex items-end">Total count</div>
            <div className="text-4xl text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
              {totalCounter?.toString() || "0"}
            </div>
          </div>
        </div>

        <div className="mt-3 border border-primary bg-neutral rounded-3xl text-secondary  overflow-hidden text-[116px] whitespace-nowrap w-full uppercase tracking-tighter font-bai-jamjuree leading-tight">
          <div className="relative overflow-x-hidden" ref={containerRef}>
            {/* for speed calculating purposes */}
            <div className="absolute -left-[9999rem]" ref={greetingRef}>
              <div className="px-4">{proposalsList}</div>
            </div>
                  <div className="px-4">{proposalsList || " "}</div>
          </div>
        </div>

        <div className="mt-3 flex items-end justify-between">
          <button
            className={`btn btn-circle btn-ghost border border-primary hover:border-primary w-12 h-12 p-1 bg-neutral flex items-center ${isRightDirection ? "justify-start" : "justify-end"
              }`}
            onClick={() => {
              if (transitionEnabled) {
                setIsRightDirection(!isRightDirection);
              }
            }}
          >
            <div className="border border-primary rounded-full bg-secondary w-2 h-2" />
          </button>
          <div className="w-44 p-0.5 flex items-center bg-neutral border border-primary rounded-full">
            <div
              className="h-1.5 border border-primary rounded-full bg-secondary animate-grow"
              style={{ animationPlayState: showTransition ? "running" : "paused" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

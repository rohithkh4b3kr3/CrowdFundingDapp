import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import abi from './contract/Funding.json';
import Buy from './components/buy';
import Memo from './components/Memo';

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x5c928D35F9b9FfEd8188BF5d3693286D8E99E6e0"; // your deployed address
      const contractABI = abi.abi;

      try {
        const { ethereum } = window;
        if (ethereum) {
          // ✅ Request wallet connection
          await ethereum.request({ method: "eth_requestAccounts" });
          
          window.ethereum.on("accountChanged", () => {
            window.location.reload();
          })
          // ✅ Create provider, signer, and contract instances
          const provider = new ethers.BrowserProvider(ethereum);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(contractAddress, contractABI, signer);

          setState({ provider, signer, contract });
          console.log("Contract connected:", contract);
        } else {
          alert("Please install MetaMask!");
        }
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    };

    connectWallet();
  }, []);
  // console.log(state);

  return (
    <>
    
    {/* <h1>APP</h1> */}
    <Buy state={state}/>
    <Memo state={state}/>
    </>
  );
}

export default App;

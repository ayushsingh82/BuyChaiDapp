import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {ethers} from "ethers"
import abi from './contractJson/chai.json'
import Buy from './components/Buy'
import Memos from './components/Memos'
import chai from "./chai.png";

function App() {
   
  const [state,setState]=useState({
    provider:null,
    signer:null,
    contract:null
  })

  const [account,setAccount]=useState("Not connected")

  useEffect(()=>{
    const template=async()=>{
      const contractAddress="0xD054AAb46D4675161D11E2EdD5fdfA88Ff710a56";
      const contractABI=abi.abi;

      //Metamask
     try{
      const {ethereum}=window;

      const  account=await ethereum.request({
       method:"eth_requestAccounts"
      })
      window.ethereum.on("accountsChanged",()=>{
         window.location.reload()
      })
       setAccount(account) ;
      const provider=new ethers.BrowserProvider(ethereum);//reading the blockchain
      const signer= await provider.getSigner(); //help in writing the blockchain

     const contract=new ethers.Contract(
       contractAddress,
       contractABI,
       signer
     )
     setState({provider,signer,contract});
     }catch(error){
      alert(error);
     }
    }
    template();
  },[])

  return (
    <div >
    <img src={chai} className="img-fluid" alt=".." width="100%" />
    <p style={{ marginTop: "10px", marginLeft: "5px" }}>
      <small>Connected Account - {account}</small>
    </p>
   
      <Buy state={state} />
      <Memos state={state} />
   
  </div>
  )
}

export default App

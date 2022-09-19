import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {useProvider} from "wagmi";
import { useState } from "react";
import {ethers} from "ethers"
const Home: NextPage = () => {
  const provider = useProvider();
  const[ContractAddress,setContractAddress] = useState("");
  const[VariableType,setVariableType] = useState("uint256");
  const[SlotNumber,setSlotNumber] = useState(0);
  const[FormValue,setFormvalue] = useState("uint256");

  const UpdateContractAddress =(event:any)=>{
    setContractAddress(event.target.value);
  }
  const UpdateVariableType =(event:any)=>{
    setVariableType(event.target.value);
  }
  const UpdateSlotNumber =(event:any)=>{
    setSlotNumber(event.target.value)
  }

  const FetchData = async() =>{
    console.log("ContractAddress ----> ",ContractAddress,"VariableType ----> ",VariableType,"SlotNumber----->",SlotNumber );
    
    const value = await provider.getStorageAt(ethers.utils.getAddress(ContractAddress),SlotNumber);
    console.log(value);
  }

  const FetchMockData = async() =>{
    // setFormvalue()
    console.log("ContractAddress ----> ",ContractAddress,"VariableType ----> ",VariableType,"SlotNumber----->",SlotNumber );
    
    // const value = await provider.getStorageAt(ethers.utils.getAddress(ContractAddress),SlotNumber);
    // console.log(value);
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>EVM storage slot reader</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ConnectButton />
        <div>
        <label>
          Contract Address
        <input name= "Contract Address" id= "ContractAddress" type="text" value= {ContractAddress} onChange={UpdateContractAddress}  />
        </label>
        <br/>
        <label>
          Variable Type
        <input name= "Variable Type" id= "VariableType" type="text" value={VariableType} onChange={UpdateVariableType} />
        </label>
        <br/>
        <label>
          Slot number 
        <input name= "Slot number" id= "SlotNumber" type="number" value={SlotNumber} onChange={UpdateSlotNumber} />
        </label>
        <br/>
        <form onSubmit = {FetchMockData} >
          <label htmlFor="Variable">Type:</label>
          <select id="Var" name="vars">
            <option value= "uint256">uint256</option>
            <option value= "string">string</option>
            <option value= "bytes">bytes</option>
            <option value= "uin256[]">uin256[]</option>
          </select>
          <input type="submit"/>
        </form>
        <button onClick={FetchData}> Fetch Storage </button>
        </div>
        
      </main>

      <footer className={styles.footer}>

      </footer>
    </div>
  );
};

export default Home;

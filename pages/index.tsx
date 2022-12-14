import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {useProvider} from "wagmi";
import { useState ,useEffect } from "react";
import {ethers} from "ethers"
import {QueryStruct,Output} from "../components/interface"

let id = 0;
const Home: NextPage = () => {
  const provider = useProvider();
  const[ContractAddress,setContractAddress] = useState("");
  const[VariableType,setVariableType] = useState("uint256");
  const[SlotNumber,setSlotNumber] = useState("0");
  const [QueryList,setQueryList] = useState<QueryStruct[] >([
]);
const [OutputList,setOutputList] = useState<Output[] >([
]);

const UpdateVariableType =(event:any)=>{
  setVariableType(event.target.value);
}
const UpdateSlotNumber =(event:any)=>{
  setSlotNumber(event.target.value)
}

const UpdateContractAddress =(event:any)=>{
    setContractAddress(event.target.value);
  }

  useEffect(() => { 
  }, [QueryList])

 const onClear = () => {
  setQueryList([]);
 }
 const onAdd = (event) => {
  event.preventDefault()
  console.log("Called");
  let newlist = [... QueryList];
  ++id;
  newlist.push({variableType:VariableType ,slotNumber:SlotNumber,id});
  setQueryList(newlist);
  return false;
  }
  const FetchData = async() =>{
    console.log("ContractAddress ----> ",ContractAddress);

      await Promise.all(QueryList.map(async (querys) => {
        const value = await provider.getStorageAt(ethers.utils.getAddress(ContractAddress),ethers.BigNumber.from(querys.slotNumber));
        console.log(value);
      }));
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
        Contract Address
        <input name= "Contract Address" id= "ContractAddress" type="text" value= {ContractAddress} onChange={UpdateContractAddress}  />
        <div>
          Contract Address :{ContractAddress}
        </div>
        </div>
        <div>
        <form >
        <fieldset>
          <label htmlFor="Variable">Variable Type:</label>
          <select  name="vars" value={VariableType} onChange={UpdateVariableType}  >
            <option value= "uint256">uint256</option>
            <option value= "string">string</option>
            <option value= "bytes">bytes</option>
            <option value= "uin256[]">uin256[]</option>
          </select>
          <label htmlFor="Slot number">Slot number:</label>
          <input name= "SlotNumber" type="string" value={SlotNumber} onChange={UpdateSlotNumber} />
          </fieldset>
          <button onClick={onAdd} > add </button>
          <button onClick={onClear} > clear all </button>
        </form>
        </div>
        <div>
          Querys to fetch :          
          {QueryList.map((Query,index)=>(
            <div key={index} >
              <> 
             Storage Slot Number {Query.slotNumber? Query.slotNumber :0} ----- Varibale Type {Query.variableType? Query.variableType : "null"}  
              </>
            </div>
          ))}
        </div>
        <div>
        <button onClick={FetchData} > fetch output </button>
        </div>
        
      </main>

      <footer className={styles.footer}>

      </footer>
    </div>
  );
};

export default Home;

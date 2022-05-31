import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./redux/data/dataActions";
import "./App.css";
import "./styles/MintStyles.css";
import "./components/Button/Button.css";
import Alert from "./components/Alert/Alert";
import Header from "./components/Header/Header";
import Navbar from "../src/components/Navbar/Navbar";
import SocialMedia from "./components/SocialMedia/SocialMedia";
import "./components/ButtonT/ButtonT.css";


const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");

const whiteList = require("./addressesList.json");

// Fix the total supply []
// Max Mint


function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [claimingNft, setClaimingNft] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({show:false, msg:"Click mint to buy your NFT"});
  const [mintAmount, setMintAmount] = useState(1);
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    SHOW_BACKGROUND: false,
  });


  const claimNFTs = () => {
  let tab = [];
  whiteList.map((el) => {
    tab.push(el.address);
  });

  const leafNodes = tab.map((address) => keccak256(address));
  const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
  const root = merkleTree.getHexRoot();
  const leaf = keccak256(blockchain.account);

  const proof = merkleTree.getHexProof(leaf);

    let cost = CONFIG.WEI_COST;
    let totalCostWei = String(cost * mintAmount);
    showAlert(true,"Minting your NFT...");
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(blockchain.account, mintAmount, proof)
      .send({
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
        maxPriorityFeePerGas: null,
        maxFeePerGas: null
      })
      .once("error", (err) => {
        showAlert(true,"Something went wrong (You're not on the whitelist)");
        setClaimingNft(false);
        console.log(err);
      })
      .then((receipt) => {
        showAlert(true,"You're Nft has been minted! Welcome to CLUB FOMO!!");
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  // to show Alert 
  const showAlert = (show = false, msg = "") => {
      setAlert({show:show, msg: msg});
  }

  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > 100) {
      newMintAmount = 100;
    }
    setMintAmount(newMintAmount);
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  return (
     <div className="main-container" id="main-container"
     data-scroll-container>
      
                  {blockchain.account === "" || blockchain.smartContract === null ? (
                      <>
                       <Header/>
                      </>
                    ) : (
                      <>
                        {Number(data.totalSupply) >= 2000 ? (
                        <>
                          <h1 className="nft-numbers">The sale has ended!</h1>
                        </>
                      ): 
                      ( <>
                          <Navbar/>
                          <h1 class="title-mint">Welcome TO <br/>  CLUB FOMO <br/> NFT WHITELIST</h1>
                          
                          <h1 className="nft-numbers"> {data.totalSupply}/{CONFIG.MAX_SUPPLY} Max supply</h1>
                          <p className="cost">Each unit costs 0.0029 eth (excluding gas fees)</p>
                          {alert.show &&  <Alert {...alert} removeAlert={showAlert}/>}

                          <div className="count-buttons">
                            <button 
                             className="btn"
                             disabled={claimingNft ? 1 : 0}
                             onClick={(e)=> {
                                 e.preventDefault();
                                 decrementMintAmount();
                             }}
                             id="count">-</button>
                             
                            <p className="btn" id="count">{mintAmount}</p>

                            <button 
                            disabled={claimingNft ? 1 : 0}
                             className="btn"
                             onClick={(e)=> {
                                 e.preventDefault();
                                 incrementMintAmount();
                             }}
                             id="count">+</button>
                        </div>
                          
                        {loading ? (
                        <Loader/>
                       ) : null}
                       <div class="wrapper">
                        <div
                          class="button"
                          disabled={claimingNft ? 1 : 0}
                          onClick={(e)=> {
                          e.preventDefault();
                          claimNFTs();
                          getData();
                        }}>
                          {claimingNft ? (
                            <>
                              <span class="button__mask"></span>
                              <span class="button__text">BUSY Minting...</span>
                              <span class="button__text button__text--bis">BUSY Minting...</span>
                            </>
                          ) :  (
                            <>
                            <span class="button__mask"></span>
                              <span class="button__text">Mint Your NFT</span>
                              <span class="button__text button__text--bis">Mint Your NFT</span>
                            </>
                          )} 
                         </div>
                        </div>
                      </>)}
                       </> 
                      )}
       
     </div> 
 )
}

export default App;



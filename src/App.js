import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./redux/data/dataActions";
import "./App.css";
import "./styles/MintStyles.css";
import "./components/Button/Button.css";
import Alert from "./components/Alert/Alert";
import Header from "./components/Header/Header";
import Navbar from "../src/components/Navbar/Navbar";
import "./components/ButtonT/ButtonT.css";
import { FaTwitter} from 'react-icons/fa';
import { SiDiscord } from "react-icons/si";
import clubFomoBg from "../src/components/Assets/Clubfomobg.mp4";




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

  //**** Function for minting NFTs by interacting with the blockchain smart contract ***/// 
  const claimNFTs = () => {
    let cost = CONFIG.WEI_COST;
    let totalCostWei = String(cost * mintAmount);
    showAlert(true,"Minting your NFT...");
    setClaimingNft(true);

    blockchain.smartContract.methods
      .mint(mintAmount)
      .send({
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
        maxPriorityFeePerGas: null,
        maxFeePerGas: null
      })
      .once("error", (err) => {
        showAlert(true,"Sorry, something went wrong.");
        setClaimingNft(false);
        console.log(err);
      })
      .then((receipt) => {
        showAlert(true,"Your NFT has been minted! Welcome to CLUB FOMO!");
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  ///**** Helper function to show alerts with custom messages ****/
  const showAlert = (show = false, msg = "") => {
      setAlert({show:show, msg: msg});
  }

  ///**** Decreases the mint amount by one, ensuring it doesn't go below one ****///
  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  ///**** Increases the mint amount by one, ensuring it doesn't exceed a certain maximum (e.g., 100) ****///
  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > 100) {
      newMintAmount = 100;
    }
    setMintAmount(newMintAmount);
  };
  
  ///**** Fetches data based on the blockchain's current account state ****///
  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  ///**** Async function that retrieves the application's configuration from a local JSON file ****///
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

  ///**** React effect hook that gets the app's configuration when the component mounts ****///
  useEffect(() => {
    getConfig();
  }, []);

  ///**** React effect hook that gets data whenever the blockchain account state changes ****///
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
                        {Number(data.totalSupply) == 0 ? (
                        <>
                          <h1 className="nft-numbers">The sale has ended, new collection coming soon!</h1>
                        </>
                      ): 
                      ( <>
                        <Navbar/>
                          <h1 class="title-mint">Welcome TO <br/>  CLUB FOMO <br/> Legendary VIP</h1>
                          <div id="fomoVideo">
                            <video src={clubFomoBg} loop muted autoPlay></video>
                          </div>
                          <h1 className="nft-numbers"> {data.totalSupply}/{CONFIG.MAX_SUPPLY} Max supply</h1>
                          <p className="cost">"Legendary VIP" NFT costs 13.85 eth (excluding gas fees)</p>

                          <ul class="socialM">
                            <li><a href="https://twitter.com/theclubfomo"
                            target="_blank">
                            <FaTwitter className="social-icon"/>
                            </a></li>

                            <li><a href="https://discord.com/invite/DMDenNFmR2"
                            target="_blank">
                            <SiDiscord className="social-icon"/>
                            </a></li>
                          </ul>

                          {alert.show &&  <Alert {...alert} removeAlert={showAlert}/>}

                          <div className="count-buttons">
                            <button 
                             className="btn"
                             disabled={claimingNft ? 1 : 1}
                             onClick={(e)=> {
                                 e.preventDefault();
                                 decrementMintAmount();
                             }}
                             id="count">-</button>
                             
                            <p className="btn" id="count">{mintAmount}</p>

                            <button 
                            disabled={claimingNft ? 1 : 1}
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



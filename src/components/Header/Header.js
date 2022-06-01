import React, {useEffect} from 'react'
import './Header.css';
import gsap from 'gsap';
import SplitText from "../../Utilis/split3.min";
import * as s from "../../styles/globalStyles";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../../redux/blockchain/blockchainActions";
import '../SocialMedia/SocialMedia';
import SocialMedia from '../SocialMedia/SocialMedia';
import "../ButtonT/ButtonT.css";


const Header = () => {

    const dispatch = useDispatch();
    const blockchain = useSelector((state) => state.blockchain);
    
    
    useEffect(() => {
        getData();
      }, [blockchain.account]);

    const getData = () => {
        if (blockchain.account !== "" && blockchain.smartContract !== null) {
          dispatch(fetchData(blockchain.account));
        }
      };

    useEffect(()=> {
        const split = new SplitText("#text-Header", {
            type: "lines",
            linesClass: "LineChildren",
        });

        const splitParent = new SplitText("#text-Header", {
            type: "lines",
            linesClass: "LineParents",
        });

        gsap.to(split.lines, {
            duration: 1.20,
            y: 0,
            opacity: 1,
            stagger:0.1,
            ease:"power2",
        })
    },[])

    return (
        <section className="header-container" data-scroll-section>

            <h1 className="text-Header bottom" id="text-Header" data-scroll>We Are CLUB FOMO</h1>
            <div class="wrapper">
                <div class="button" onClick={(e) => {
                e.preventDefault();
                dispatch(connect());
                getData();
                }}>
                    <span class="button__mask"></span>
                    <span class="button__text">Connect Wallet</span>
                    <span class="button__text button__text--bis">Connect Wallet</span>
                </div>
            </div>

            <h2 className='network-title'> Please make sure your wallet is connected to "Ethereum Network" </h2>
        </section>
    )
}

export default Header

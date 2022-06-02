import React,{useState} from "react";
import logo from "../../images/huminaty-lg.png";
import openSeaLogo from "../../images/openseaLogo.svg";
import fomoLogo from "../../components/Assets/fomoLogo.png";
import "./Navbar.css";

const Navbar = () => {

  return (
    <nav className="nav-bar">
        <a href="https://clubfomo.com/" target="_blank">
          <img src={fomoLogo} alt="clubFomoLogo" className="logo"/>
        </a>
      <div>
        <a target={"_blank"} href="https://opensea.io/collection/rose-law-group-metareport">
          <button className="btn-navbar"> View Your NFT
          <img src={openSeaLogo} className="openSeaLogo" alt="openseaLogo"/>
          </button>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
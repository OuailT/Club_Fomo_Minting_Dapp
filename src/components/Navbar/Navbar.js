import React,{useState} from "react";
import logo from "../../images/huminaty-lg.png";
import openSeaLogo from "../../images/openseaLogo.svg";
import "./Navbar.css";

const Navbar = () => {

  return (
    <nav className="nav-bar">
        <div></div>
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
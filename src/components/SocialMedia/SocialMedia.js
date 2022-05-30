import React from "react";
import { FaTwitter} from 'react-icons/fa';
import { AiOutlineInstagram} from 'react-icons/ai';
import "./SocialMedia.css";



const SocialMedia = () => {
    return (
    <div className="social_container">

        <h5 className="social-title">Follow us on social media for more!</h5>
        <div className="social-media">
            <a href="https://twitter.com/RlgMeta" target="_blank">
                    <FaTwitter className="social-icon"/> 
            </a>

            <a href="https://www.instagram.com/roselawgroupmeta/" target="_blank">
                    <AiOutlineInstagram className="social-icon"/> 
            </a>
        </div>
    </div>
    )
}   

export default SocialMedia;
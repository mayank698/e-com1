import React from "react";
import playStore from "../../images/Playstore.png";
import appStore from "../../images/Appstore.png";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>ECOMMERCE.</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2021 &copy; MeMayankPandey</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <Link to="http://instagram.com/meabhisingh">Instagram</Link>
        <Link to="http://youtube.com/6packprogramemr">Youtube</Link>
        <Link to="http://instagram.com/meabhisingh">Facebook</Link>
      </div>
    </footer>
  );
};

export default Footer;

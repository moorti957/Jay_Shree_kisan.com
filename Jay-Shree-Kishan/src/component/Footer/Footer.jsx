import React from "react";
import { FaShippingFast, FaRegClock } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import { LuBoxes } from "react-icons/lu";

import { FaFacebookF, FaPinterestP, FaInstagram } from "react-icons/fa";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcDiscover,
} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Top Features */}
      <div className="footer-top">
        <div className="feature">
          <FaShippingFast className="icon orange" />
          <h4 className="green">Free Shipping</h4>
          <p>On Order $23 - 7 Days A Week</p>
        </div>
        <div className="feature">
          <MdOutlineAttachMoney className="icon orange" />
          <h4 className="green">Money Back Guarantee</h4>
          <p>Send Within 30 days</p>
        </div>
        <div className="feature">
         <LuBoxes className="icon orange" />
          <h4 className="green">Free Returns</h4>
          <p>free 90 days returns policy</p>
        </div>
        <div className="feature">
          <FaRegClock className="icon orange" />
          <h4 className="green">24/7 Customer Service</h4>
          <p>Call us 24/7 at 000-123-455</p>
        </div>
      </div>

      {/* Footer Links */}
      <div className="footer-links">
        <div>
          <h3 className="green">About Us</h3>
          <p>
            Must explain too you all this mistaken idea off denouncing pleasure
            and well praising pain was born and I will gives you complete
            accounts systems must.
          </p>
        </div>
        <div>
          <h3 className="green">Information</h3>
          <ul>
            <li>About Us</li>
            <li>Delivery Information</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>Brands</li>
          </ul>
        </div>
        <div>
          <h3 className="green">My Account</h3>
          <ul>
            <li>My Account</li>
            <li>Order History</li>
            <li>Wish List</li>
            <li>Newsletter</li>
            <li>Specials</li>
          </ul>
        </div>
        <div>
          <h3 className="green">Customer Service</h3>
          <ul>
            <li>Contact Us</li>
            <li>Returns</li>
            <li>Site Map</li>
            <li>Gift Certificates</li>
            <li>Affiliate</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        {/* Newsletter */}
        <div>
          <h3 className="green">Newsletter</h3>
          <p>Get now free 20% discount for all products on your first order!</p>
          <div className="newsletter">
            <input type="email" placeholder="Your email address" />
            <button>Subscribe</button>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="green">Contact Us</h3>
          <p>9070 Green Lake Drive Chevy Chase, MD 20815, India</p>
          <p className="coll">📞 0123-456-789</p>
        </div>

        
        <div className="footer-social-payment">
          <h3 className="green">Follow Us</h3>
          <div className="social">
            <FaFacebookF />
            <FaPinterestP />
            <FaInstagram />
          </div>
          <h3 className="green">Payment</h3>
          <div className="payment">
            <FaCcAmex />
            <FaCcMastercard />
            <FaCcDiscover />
            <FaCcVisa />
          </div>
        </div>
      </div>

  
      <div className="copyright">
        Powered By OpenCart upbasket © 2025
      </div>
    </footer>
  );
};

export default Footer;

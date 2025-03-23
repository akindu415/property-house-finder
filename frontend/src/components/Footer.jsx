import React from "react";
import './FooterStyle.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-about">
          <h3>About Us</h3>
          <p>
            We are a trusted real estate agency committed to helping you find your dream home or investment property. 
          </p>
        </div>

        
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>Email: realestate@gmail.com</p>
          <p>Phone: 077-5989123</p>
          <p>Address: 593/A,Kaluthara</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Real Estate Agency. All Rights Reserved.</p>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
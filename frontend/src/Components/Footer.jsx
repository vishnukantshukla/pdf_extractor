import React from 'react';
import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaLinkedin, FaGithub, FaHome, FaEnvelope, FaPhone } from 'react-icons/fa';
import '../css/footer.css'
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Company Info Section */}
        <div className="footer-section">
          <h6>Coding Blocks PDF Extraction</h6>
          <p>
            Hello EveryOne This is PDF Extraction in which you can extract the text from pdf. and You can question and it will give exact output
          </p>
        </div>

        {/* Useful Links Section */}
        <div className="footer-section">
          <h6>Useful Links</h6>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/AboutPage">About Us</Link></li>
            <li><Link to="/">Services</Link></li>
            <li><Link to="/">ContactUs</Link></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-section">
          <h6>Contact</h6>
          <p>
            <FaHome className="footer-icon" /> Bareilly,Uttar Pradesh, India<br />
            <FaEnvelope className="footer-icon" /> vishnu@gmail.com<br />
            <FaPhone className="footer-icon" /> +91-8957474747
          </p>
        </div>

        {/* Social Media Section */}
        <div className="footer-section social-media">
          <h6>Follow Us</h6>
          <div className="social-icons">
            <Link to="http://facebook.com" className="social-icon"><FaFacebookF /></Link>
            <Link to="http://Twitter.com" className="social-icon"><FaTwitter /></Link>
            <Link to="http://google.com" className="social-icon"><FaGoogle /></Link>
            <Link to="http://instagram.com" className="social-icon"><FaInstagram /></Link>
            <Link to="https://www.linkedin.com/" className="social-icon"><FaLinkedin /></Link>
            <Link to="http://github.com" className="social-icon"><FaGithub /></Link>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-copyright">
        <p>© 2024 Copyright: Coding Blocks.com</p>
      </div>
    </footer>
  );
};

export default Footer;

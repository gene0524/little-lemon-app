import React from 'react';
import logo from '../assets/logo.png'; // Adjust path as needed

function Footer() {
  return (
    <footer>
      <div className="footer-section">
        <img src={logo} alt="Little Lemon Logo" className="footer-logo" />
      </div>
      
      <div className="footer-section">
        <h4>Doormat Navigation</h4>
        <ul className="footer-nav">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/menu">Menu</a></li>
          <li><a href="/reservations">Reservations</a></li>
          <li><a href="/order-online">Order Online</a></li>
          <li><a href="/login">Login</a></li>
        </ul>
      </div>
      
      <div className="footer-section">
        <h4>Contact</h4>
        <div className="contact-info">
          <p>Address</p>
          <p>Phone number</p>
          <p>Email</p>
        </div>
      </div>
      
      <div className="footer-section">
        <h4>Social Media Links</h4>
        <div className="contact-info">
          <p>Address</p>
          <p>Phone number</p>
          <p>Email</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
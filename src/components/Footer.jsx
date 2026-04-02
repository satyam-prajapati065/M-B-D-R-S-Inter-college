import React from "react";
import { Link, useLocation } from "react-router";

const Footer = () => {
  const location = useLocation();

  // Wo pages jahan footer NAHI dikhana hai
  const hiddenPaths = ["/admission", "/attendance", "/fees", "/records"];

  // Agar current path hiddenPaths mein hai, toh kuch mat dikhao
  if (hiddenPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <footer className="main-footer">
      <div className="footer-container">
        {/* Column 1: School Info */}
        <div className="footer-col">
          <h3 className="footer-logo">
            M B D R S <span>Inter College</span>
          </h3>
          <p>
            Maa Brahma Devi Rama Shankar Inter College provides quality
            education with a focus on character building and academic
            excellence.
          </p>
          <div className="footer-socials">
            <a href="#">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-youtube"></i>
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Admin Login</Link>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact Details */}
        <div className="footer-col">
          <h4>Contact Us</h4>
          <p>
            <i className="fa-solid fa-location-dot"></i> Akbarpur, Ambedkar
            Nagar, UP
          </p>
          <p>
            <i className="fa-solid fa-phone"></i> +917947420676
          </p>
          <p>
            <i className="fa-solid fa-envelope"></i> info@mbdrs.edu.in
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} MBDRS Inter College. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import { Link, useLocation } from "react-router";

const Footer = () => {
  const mapLOcation =
    "https://www.google.com/maps/place/Maa+Bramha+Devi+Ramashankar+inter+collage,+Akbarpur/@26.4277162,82.5256524,19z/data=!4m14!1m7!3m6!1s0x3990928f021d7a3d:0xab73385dd026f138!2sM.B.D.R.S.Sainik+school!8m2!3d26.4275289!4d82.5263605!16s%2Fg%2F11c617jl6h!3m5!1s0x399093b4a261f2df:0xaf43da8a8bd539a5!8m2!3d26.4275835!4d82.526272!16s%2Fg%2F11sqhx4583?entry=ttu&g_ep=EgoyMDI2MDQwMS4wIKXMDSoASAFQAw%3D%3D";

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
            <a href={mapLOcation} target="_blank" className="contact-link">
              <i className="fa-solid fa-location-dot"></i>
              &nbsp; Akbarpur, Ambedkar Nagar, UP
            </a>
          </p>
          <p>
            <a href="tel:+917947420676" className="contact-link">
              <i className="fa-solid fa-phone"></i> +91 7947420676
            </a>
          </p>
          <p>
            <a href="mailto:info@mbdrs.edu.in" className="contact-link">
              <i className="fa-solid fa-envelope"></i> info@mbdrs.edu.in
            </a>
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} MBDRS Inter College. All Rights
          Reserved.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <b>Developed By Satyam Prajapati</b>
          <a
            href="https://www.linkedin.com/in/satyam-prajapati-94a25831a"
            className="developed-holder"
            target="_blank"
          >
            <i className="fa-brands fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

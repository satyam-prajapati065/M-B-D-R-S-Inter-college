import React, { useEffect } from "react";

const TopBar = () => {
  const mapLOcation =
    "https://www.google.com/maps/place/Maa+Bramha+Devi+Ramashankar+inter+collage,+Akbarpur/@26.4277162,82.5256524,19z/data=!4m14!1m7!3m6!1s0x3990928f021d7a3d:0xab73385dd026f138!2sM.B.D.R.S.Sainik+school!8m2!3d26.4275289!4d82.5263605!16s%2Fg%2F11c617jl6h!3m5!1s0x399093b4a261f2df:0xaf43da8a8bd539a5!8m2!3d26.4275835!4d82.526272!16s%2Fg%2F11sqhx4583?entry=ttu&g_ep=EgoyMDI2MDQwMS4wIKXMDSoASAFQAw%3D%3D";

  useEffect(() => {
    // Google script load karna
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);
    }

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "hi,en",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element",
      );
    };
  }, []);

  return (
    <div className="top-bar">
      <div className="top-bar-container">
        <div className="top-left-yellow">
          <div className="social-icons">
            <a href="#">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
          </div>
          <div className="skew-divider"></div>
        </div>

        <div className="top-middle">
          {/* Is div ke andar Google apna widget banayega */}
          <div id="google_translate_element"></div>
        </div>

        <div className="top-right-info">
          <span>
            <a href={mapLOcation} target="_blank" className="contact-link-top">
              <i className="fa-solid fa-location-dot"></i>
              &nbsp; Akbarpur, Ambedkar Nagar, UP
            </a>
          </span>
          <span>
            <a href="mailto:info@mbdrs.edu.in" className="contact-link-top">
              <i className="fa-solid fa-envelope"></i> info@mbdrs.edu.in
            </a>
          </span>
          <span>
            <a href="tel:+917947420676" className="contact-link-top">
              <i className="fa-solid fa-phone"></i> +91 7947420676
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;

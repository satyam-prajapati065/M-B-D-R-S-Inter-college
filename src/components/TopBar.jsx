import React, { useEffect } from "react";

const TopBar = () => {
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
            <i className="fa-solid fa-location-dot"></i> Akbarpur, Ambedkar
            Nagar, UP
          </span>
          <span>
            <i className="fa-solid fa-envelope"></i> info@mbdrs.edu.in
          </span>
          <span>
            <i className="fa-solid fa-phone"></i> +917947420676
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;

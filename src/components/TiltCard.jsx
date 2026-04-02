import React, { useRef, useState, useEffect } from "react";

const TiltCard = ({ calendarImg, tiltMax = 20 }) => {
  const cardRef = useRef(null);

  // Mobile check karne ke liye state
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Window resize handle karne ke liye
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseMove = (e) => {
    if (isMobile) return; // Mobile par tilt effect band rakhenge taaki scroll mein dikat na ho
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -tiltMax;
    const rotateY = ((x - centerX) / centerX) * tiltMax;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    card.style.transition = "none";
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    card.style.transform = `rotateX(0deg) rotateY(0deg)`;
    card.style.transition = "transform 0.5s ease";
  };

  // --- Dynamic Styles ---
  const dynamicCardStyle = {
    ...styles.tiltCard,
    // Agar mobile hai toh size chota kar do (e.g. 300x280), nahi toh wahi 420x400 rahega
    width: isMobile ? "300px" : "420px",
    height: isMobile ? "280px" : "400px",
  };

  return (
    <div style={styles.container}>
      <div
        ref={cardRef}
        style={dynamicCardStyle}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          style={{
            ...styles.cardImage,
            backgroundImage: `url(${calendarImg})`,
          }}
        ></div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    perspective: "1000px",
    display: "inline-block",
    margin: "10px auto", // Mobile ke liye margin thoda kam
    textAlign: "center",
  },
  tiltCard: {
    background: "#fff",
    position: "relative",
    transformStyle: "preserve-3d",
    boxShadow: "0 20px 30px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    cursor: "pointer",
    borderRadius: "12px", // Thoda round kar diya mobile pe achha lagta hai
  },
  cardImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
};

export default TiltCard;

import React, { useRef } from "react";

const TiltCard = ({ calendarImg, tiltMax = 20 }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
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

  return (
    <div style={styles.container}>
      <div
        ref={cardRef}
        style={styles.tiltCard}
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
    margin: "20px",
  },
  tiltCard: {
    width: "420px",
    height: "400px",
    background: "#fff",
    position: "relative",
    transformStyle: "preserve-3d",
    boxShadow: "0 20px 30px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    cursor: "pointer",
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

import React from "react";
import principleImg from "../assets/principle.png";

const Messages = () => {
  const messages = [
    {
      id: 1,
      role: "From the Principal's Desk",
      name: "Chandra Dev Pandey",
      text: "Education is not just about books; it's about building character and curious minds. At MBDRS, we ensure every child finds their unique path to success.",
      img: principleImg, // Image path
      color: "#001f4d", // Deep Blue
    },
  ];

  return (
    <section className="modern-msg-section">
      <div className="msg-header">
        <h2>Guiding Lights</h2>
        <p>Words of wisdom from our leadership</p>
        <div className="msg-underline"></div>
      </div>

      <div className="msg-container">
        {messages.map((m, index) => (
          <div
            key={m.id}
            className={`msg-row ${index % 2 !== 0 ? "row-reverse" : ""}`}
          >
            <div className="msg-img-box">
              <img src={m.img} alt={m.name} />
              <div
                className="img-backdrop"
                style={{ backgroundColor: m.color }}
              ></div>
            </div>

            <div className="msg-text-box">
              <span className="msg-role" style={{ color: m.color }}>
                {m.role}
              </span>
              <h3 className="msg-name">{m.name}</h3>
              <p className="msg-para">"{m.text}"</p>
              <button
                className="msg-btn"
                style={{ borderBottom: `3px solid ${m.color}` }}
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Messages;

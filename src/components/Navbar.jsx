import React, { useState } from "react"; // 1. useState add kiya
import { NavLink, useNavigate } from "react-router";
import logoImg from "../assets/school.png";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // 2. Mobile menu state

  const adminItems = [
    { path: "/admission", label: "Admission", icon: "fa-solid fa-user-plus" },
    { path: "/records", label: "Records", icon: "fa-solid fa-folder-open" },
    {
      path: "/attendance",
      label: "Attendance",
      icon: "fa-solid fa-calendar-check",
    },
    { path: "/fees", label: "Fees", icon: "fa-solid fa-file-invoice-dollar" },
  ];

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsOpen(false); // Menu band karo logout par
    navigate("/");
  };

  // Menu band karne ke liye helper function
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <NavLink
          to="/"
          onClick={closeMenu}
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <img src={logoImg} alt="logo" style={{ height: "50px" }} />
          <span
            className="logo-text"
            style={{ fontWeight: "bold", marginLeft: "10px" }}
          >
            M B D R S Inter College
          </span>
        </NavLink>
      </div>

      {/* --- 3. HAMBURGER ICON (Mobile Only) --- */}
      <button className="mobile-menu-icon" onClick={() => setIsOpen(!isOpen)}>
        <i className={isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
      </button>

      {/* --- 4. NAV LINKS (Dynamic Class based on isOpen) --- */}
      <ul className={isOpen ? "nav-links nav-active" : "nav-links"}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeMenu}
          >
            <i className="fa-solid fa-house"></i> Home
          </NavLink>
        </li>

        {isLoggedIn ? (
          <>
            {adminItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={closeMenu}
                >
                  <i className={item.icon} style={{ marginRight: "8px" }}></i>
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li>
              <button onClick={handleLogout} className="logout-btn">
                <i className="fa-solid fa-right-from-bracket"></i> Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <NavLink to="/login" className="login-nav-btn" onClick={closeMenu}>
              <i className="fa-solid fa-right-to-bracket"></i> Admin Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

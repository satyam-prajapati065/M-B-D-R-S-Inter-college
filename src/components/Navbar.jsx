import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import logoImg from "../assets/school.png";

// isLoggedIn ke sath userRole prop bhi liya
const Navbar = ({ isLoggedIn, userRole, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

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
    setIsLoggedIn(); // App.js wala logout handler
    setIsOpen(false);
    navigate("/");
  };

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

      <button className="mobile-menu-icon" onClick={() => setIsOpen(!isOpen)}>
        <i className={isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
      </button>

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
            {/* --- ROLE FILTER LOGIC --- */}
            {adminItems.map((item) => {
              // Agar role 'teacher' hai aur item 'Attendance' nahi hai, toh return null (mat dikhao)
              if (userRole === "teacher" && item.label !== "Attendance") {
                return null;
              }

              return (
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
              );
            })}

            <li>
              <button
                onClick={handleLogout}
                className="logout-btn"
                style={{ cursor: "pointer", backgroundColor:"#fff", color:"red" }}
              >
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

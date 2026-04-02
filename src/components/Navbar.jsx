import React from "react";
import { NavLink, useNavigate } from "react-router";
import logoImg from "../assets/school.png";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  // Sabhi Tabs ke liye Icons aur Paths ka array
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
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <NavLink
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <img src={logoImg} alt="logo" style={{ height: "50px" }} />
          <span style={{ fontWeight: "bold", marginLeft: "10px" }}>
            M B D R S Inter College
          </span>
        </NavLink>
      </div>

      <ul className="nav-links">
        {/* Home Hamesha Dikhega */}
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <i className="fa-solid fa-house"></i> Home
          </NavLink>
        </li>

        {/* Agar Login Hai Toh Admin Tabs Dikhao */}
        {isLoggedIn ? (
          <>
            {adminItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => (isActive ? "active" : "")}
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
          /* Agar Login Nahi Hai Toh Sirf Login Tab Dikhao */
          <li>
            <NavLink to="/login" className="login-nav-btn">
              <i className="fa-solid fa-right-to-bracket"></i> Admin Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

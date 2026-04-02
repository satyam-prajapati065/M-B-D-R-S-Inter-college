import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Navbar from "./components/Navbar";
import Admission from "./components/Admission";
import Attendance from "./components/Attendance";
import Fees from "./components/Fees";
import ClassView from "./components/ClassView";
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import Events from "./components/Events";
import ConfirmModal from "./components/ConfirmModal"; // Tera Naya Component
import "./App.css";

function App() {
  // --- LocalStorage & State Management ---
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("mbdrs_students");
    return saved ? JSON.parse(saved) : [];
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("mbdrs_auth") === "true";
  });

  const [adminPass, setAdminPass] = useState(() => {
    const saved = localStorage.getItem("mbdrs_pass");
    return saved ? saved : "mbdrs123";
  });

  const [secretKey] = useState("12345");

  // --- ConfirmModal State ---
  const [modal, setModal] = useState({
    isOpen: false,
    message: "",
    type: "success", // 'success' or 'confirm'
    onConfirm: null,
  });

  useEffect(() => {
    localStorage.setItem("mbdrs_students", JSON.stringify(students));
    localStorage.setItem("mbdrs_auth", isLoggedIn);
    localStorage.setItem("mbdrs_pass", adminPass);
  }, [students, isLoggedIn, adminPass]);

  // --- Modal Control Functions ---
  const showAlert = (type, message, onConfirmAction = null) => {
    setModal({
      isOpen: true,
      type: type,
      message: message,
      onConfirm: () => {
        if (onConfirmAction) onConfirmAction(); // Action execute karo
        setModal((prev) => ({ ...prev, isOpen: false })); // Modal band karo
      },
    });
  };

  const closeModal = () => setModal((prev) => ({ ...prev, isOpen: false }));

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <TopBar />
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

        {/* --- TERA CUSTOM COMPONENT INTEGRATION --- */}
        <ConfirmModal
          isOpen={modal.isOpen}
          type={modal.type}
          message={modal.message}
          onConfirm={modal.onConfirm}
          onCancel={closeModal}
        />

        <main className="container">
          <Routes>
            {/* Home Route */}
            <Route
              path="/"
              element={
                <>
                  <div
                    className="hero card"
                    style={{ textAlign: "center", marginTop: "10px" }}
                  >
                    <h1>Welcome to MBDRS Inter College</h1>
                    <div style={{ fontSize: "5rem", margin: "20px" }}>🏫</div>
                    {isLoggedIn && <h3>Admin Dashboard Active</h3>}
                  </div>
                  <Events />
                </>
              }
            />

            {/* Login Route */}
            <Route
              path="/login"
              element={
                isLoggedIn ? (
                  <Navigate to="/" />
                ) : (
                  <LoginScreen
                    onLogin={() => setIsLoggedIn(true)}
                    showAlert={showAlert}
                    correctPass={adminPass}
                    secretKey={secretKey}
                    setAdminPass={setAdminPass}
                  />
                )
              }
            />

            {/* Admission Route */}
            <Route
              path="/admission"
              element={
                isLoggedIn ? (
                  <Admission
                    students={students}
                    addStudent={(s) => {
                      setStudents([...students, s]);
                      showAlert(
                        "success",
                        "Admission Successfully Ho Gaya Hai!",
                      );
                    }}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            {/* Records Route */}
            <Route
              path="/records"
              element={
                isLoggedIn ? (
                  <ClassView
                    students={students}
                    setStudents={setStudents}
                    showAlert={showAlert} // Pass showAlert as a prop for Delete functionality
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            {/* Attendance & Fees Routes */}
            <Route
              path="/attendance"
              element={
                isLoggedIn ? (
                  <Attendance students={students} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/fees"
              element={
                isLoggedIn ? (
                  <Fees students={students} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

// --- Login & Reset Screen Component ---
const LoginScreen = ({
  onLogin,
  showAlert,
  correctPass,
  secretKey,
  setAdminPass,
}) => {
  const [view, setView] = useState("login");
  const [loginData, setLoginData] = useState({ user: "", pass: "" });
  const [resetData, setResetData] = useState({
    oldPass: "",
    newPass: "",
    confirmPass: "",
    key: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.user === "admin" && loginData.pass === correctPass) {
      onLogin();
    } else {
      showAlert("error", "Invalid Username or Password!");
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    if (resetData.newPass !== resetData.confirmPass) {
      return showAlert(
        "error",
        "New Password aur Confirm Password match nahi kar rahe!",
      );
    }

    if (resetData.oldPass === correctPass || resetData.key === secretKey) {
      setAdminPass(resetData.newPass);
      showAlert("success", "Password सफलतापूर्वक बदल दिया गया!", () =>
        setView("login"),
      );
    } else {
      showAlert("error", "Old Password या Secret Key गलत है!");
    }
  };

  return (
    <div className="login-container">
      {view === "login" ? (
        <div className="card login-card">
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            Admin Login
          </h2>
          <form
            onSubmit={handleLogin}
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <input
              type="text"
              placeholder="Username"
              className="input-field"
              required
              onChange={(e) =>
                setLoginData({ ...loginData, user: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              required
              onChange={(e) =>
                setLoginData({ ...loginData, pass: e.target.value })
              }
            />
            <button type="submit" className="login-btn">
              Sign In
            </button>
            <p
              onClick={() => setView("forgot")}
              style={{
                color: "#d32f2f",
                cursor: "pointer",
                textAlign: "center",
                fontSize: "14px",
              }}
            >
              Forgot Password?
            </p>
          </form>
        </div>
      ) : (
        <div className="card login-card" style={{ maxWidth: "450px" }}>
          <h2 style={{ textAlign: "center", marginBottom: "15px" }}>
            Reset Password
          </h2>
          <form
            onSubmit={handleReset}
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <input
              type="password"
              placeholder="Old Password"
              className="input-field"
              onChange={(e) =>
                setResetData({ ...resetData, oldPass: e.target.value })
              }
            />
            <hr />
            <input
              type="password"
              placeholder="New Password"
              className="input-field"
              required
              onChange={(e) =>
                setResetData({ ...resetData, newPass: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="input-field"
              required
              onChange={(e) =>
                setResetData({ ...resetData, confirmPass: e.target.value })
              }
            />
            <hr />
            <p>Or</p>
            <input
              type="text"
              placeholder="Secret Key (12345)"
              className="input-field"
              onChange={(e) =>
                setResetData({ ...resetData, key: e.target.value })
              }
            />
            <button type="submit" className="login-btn">
              Update Password
            </button>
            <p
              onClick={() => setView("login")}
              style={{
                color: "#004d40",
                cursor: "pointer",
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              Back to Login
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default App;

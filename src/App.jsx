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
import ConfirmModal from "./components/ConfirmModal";
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

  // Naya Role State (Admin ya Teacher)
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem("mbdrs_role") || null;
  });

  const [adminPass, setAdminPass] = useState(() => {
    const saved = localStorage.getItem("mbdrs_pass");
    return saved ? saved : "mbdrs123";
  });

  // Teacher password (Fixed rakh sakte ho ya adminPass ki tarah save kar sakte ho)
  const [teacherPass] = useState("teacher123");
  const [secretKey] = useState("12345");

  const [modal, setModal] = useState({
    isOpen: false,
    message: "",
    type: "success",
    onConfirm: null,
  });

  useEffect(() => {
    localStorage.setItem("mbdrs_students", JSON.stringify(students));
    localStorage.setItem("mbdrs_auth", isLoggedIn);
    localStorage.setItem("mbdrs_role", userRole || "");
    localStorage.setItem("mbdrs_pass", adminPass);
  }, [students, isLoggedIn, userRole, adminPass]);

  const showAlert = (type, message, onConfirmAction = null) => {
    setModal({
      isOpen: true,
      type: type,
      message: message,
      onConfirm: () => {
        if (onConfirmAction) onConfirmAction();
        setModal((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  const closeModal = () => setModal((prev) => ({ ...prev, isOpen: false }));

  // --- Login Handler ---
  const handleLogin = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    localStorage.removeItem("mbdrs_auth");
    localStorage.removeItem("mbdrs_role");
  };

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <TopBar />
        {/* Navbar ko Role pass kiya taaki wo buttons chhupa sake */}
        <Navbar
          isLoggedIn={isLoggedIn}
          userRole={userRole}
          setIsLoggedIn={handleLogout}
        />

        <ConfirmModal
          isOpen={modal.isOpen}
          type={modal.type}
          message={modal.message}
          onConfirm={modal.onConfirm}
          onCancel={closeModal}
        />

        <main className="container">
          <Routes>
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
                    {isLoggedIn && (
                      <h3>
                        {userRole === "admin" ? "Admin" : "Teacher"} Dashboard
                        Active
                      </h3>
                    )}
                  </div>
                  <Events />
                </>
              }
            />

            <Route
              path="/login"
              element={
                isLoggedIn ? (
                  <Navigate to="/" />
                ) : (
                  <LoginScreen
                    onLogin={handleLogin}
                    showAlert={showAlert}
                    correctPass={adminPass}
                    teacherPass={teacherPass}
                    secretKey={secretKey}
                    setAdminPass={setAdminPass}
                  />
                )
              }
            />

            {/* --- Protected Routes (Role Based) --- */}

            {/* Admission: Only Admin */}
            <Route
              path="/admission"
              element={
                isLoggedIn && userRole === "admin" ? (
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
                  <Navigate to={isLoggedIn ? "/" : "/login"} />
                )
              }
            />

            {/* Records: Only Admin */}
            <Route
              path="/records"
              element={
                isLoggedIn && userRole === "admin" ? (
                  <ClassView
                    students={students}
                    setStudents={setStudents}
                    showAlert={showAlert}
                  />
                ) : (
                  <Navigate to={isLoggedIn ? "/" : "/login"} />
                )
              }
            />

            {/* Attendance: Admin and Teacher Dono ke liye */}
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

            {/* Fees: Only Admin */}
            <Route
              path="/fees"
              element={
                isLoggedIn && userRole === "admin" ? (
                  <Fees students={students} />
                ) : (
                  <Navigate to={isLoggedIn ? "/" : "/login"} />
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

// --- Login Screen Update ---
const LoginScreen = ({
  onLogin,
  showAlert,
  correctPass,
  teacherPass,
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
    // Admin Check
    if (loginData.user === "admin" && loginData.pass === correctPass) {
      onLogin("admin");
    }
    // Teacher Check
    else if (loginData.user === "teacher" && loginData.pass === teacherPass) {
      onLogin("teacher");
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
      showAlert("success", "Password Successfully Badal Gaya!", () =>
        setView("login"),
      );
    } else {
      showAlert("error", "Old Password ya Secret Key galat hai!");
    }
  };

  return (
    <div className="login-container">
      {view === "login" ? (
        <div className="card login-card">
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            Staff Login
          </h2>
          <form
            onSubmit={handleLogin}
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <input
              type="text"
              placeholder="Username (admin/teacher)"
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
            <p>Or use Secret Key</p>
            <input
              type="text"
              placeholder="Secret Key"
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

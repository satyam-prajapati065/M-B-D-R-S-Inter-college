import React, { useState, useEffect } from "react";

const Admission = ({ addStudent, students, showAlert }) => {
  const [selectedClass, setSelectedClass] = useState("LKG");
  const [nextRoll, setNextRoll] = useState(1);

  const classes = [
    "LKG",
    "UKG",
    "1st",
    "2nd",
    "3rd",
    "4th",
    "5th",
    "6th",
    "7th",
    "8th",
    "9th",
    "10th",
    "11th",
    "12th",
  ];

  // --- AGE LIMIT LOGIC ---
  // Aaj ki date se theek 3 saal purani date nikalne ke liye
  const today = new Date();
  const maxDate = new Date(
    today.getFullYear() - 3,
    today.getMonth(),
    today.getDate(),
  )
    .toISOString()
    .split("T")[0];

  useEffect(() => {
    const classStudents = students.filter((s) => s.class === selectedClass);
    const roll =
      classStudents.length > 0
        ? Math.max(...classStudents.map((s) => parseInt(s.roll))) + 1
        : 1;
    setNextRoll(roll);
  }, [selectedClass, students]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newStudent = {
      id: Date.now(),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      name: `${formData.get("firstName")} ${formData.get("lastName")}`,
      fatherName: formData.get("fatherName"),
      motherName: formData.get("motherName"),
      dob: formData.get("dob").split("-").reverse().join("-"),
      address: formData.get("address"),
      class: selectedClass,
      roll: nextRoll,
    };

    addStudent(newStudent);
    e.target.reset();
    showAlert(
      "success",
      `Admission Successful! ${newStudent.name} (Roll: ${nextRoll}) registered successfully.`,
    );
  };

  return (
    <div className="card" style={{ maxWidth: "700px", margin: "20px auto" }}>
      <h2 style={{ color: "#004d40", textAlign: "center" }}>
        Admission Portal
      </h2>
      <hr />

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        <div>
          <label style={{ fontWeight: "bold" }}>First Name:</label>
          <input
            name="firstName"
            placeholder="First Name"
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ fontWeight: "bold" }}>Last Name:</label>
          <input
            name="lastName"
            placeholder="Last Name"
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ fontWeight: "bold" }}>Father's Name:</label>
          <input
            name="fatherName"
            placeholder="Father's Full Name"
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ fontWeight: "bold" }}>Mother's Name:</label>
          <input
            name="motherName"
            placeholder="Mother's Full Name"
            required
            style={inputStyle}
          />
        </div>

        {/* Date of Birth with MAX Limit */}
        <div>
          <label style={{ fontWeight: "bold" }}>Date of Birth:</label>
          <input
            type="date"
            name="dob"
            max={maxDate} // Yahan logic laga diya hai
            required
            style={inputStyle}
          />
          <small style={{ color: "#666", fontSize: "11px" }}>
            * Min. age 3 years required
          </small>
        </div>

        <div>
          <label style={{ fontWeight: "bold" }}>Select Class:</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            style={inputStyle}
          >
            {classes.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div style={{ gridColumn: "span 2" }}>
          <label style={{ fontWeight: "bold" }}>Full Address:</label>
          <textarea
            name="address"
            placeholder="Enter Full Address"
            required
            style={{ ...inputStyle, height: "60px" }}
          />
        </div>

        <div
          style={{
            gridColumn: "span 2",
            background: "#e0f2f1",
            padding: "15px",
            borderRadius: "5px",
            border: "1px dashed #004d40",
          }}
        >
          <p style={{ margin: 0, fontSize: "14px", color: "#004d40" }}>
            Assigning <b>Class {selectedClass}</b>, Next Roll No:{" "}
            <b>{nextRoll}</b>
          </p>
        </div>

        <button type="submit" style={btnStyle}>
          Confirm Admission 📝
        </button>
      </form>
    </div>
  );
};

// Styles (Same as yours)
const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "5px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  boxSizing: "border-box",
};
const btnStyle = {
  gridColumn: "span 2",
  padding: "12px",
  background: "#004d40",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
};

export default Admission;

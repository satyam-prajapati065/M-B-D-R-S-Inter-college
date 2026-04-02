import React, { useState } from "react";

const ClassView = ({ students, setStudents, showAlert }) => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Naya State Search ke liye

  const [editData, setEditData] = useState({
    name: "",
    fatherName: "",
    dob: "",
    address: "",
  });

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

  // --- Search & Filter Logic ---
  const displayStudents = students.filter((s) => {
    const matchesClass = s.class === selectedClass;
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.roll.toString().includes(searchTerm);
    return matchesClass && matchesSearch;
  });

  const deleteStudent = (id) => {
    showAlert(
      "confirm",
      "Kya aap sach mein is student ka record delete karna chahte hain?",
      () => {
        setStudents(students.filter((s) => s.id !== id));
      },
    );
  };

  const startEdit = (student) => {
    setEditingId(student.id);
    setEditData({
      name: student.name,
      fatherName: student.fatherName,
      dob: student.dob,
      address: student.address,
    });
  };

  const saveEdit = (id) => {
    setStudents(students.map((s) => (s.id === id ? { ...s, ...editData } : s)));
    setEditingId(null);
    showAlert("success", "Record successfully update ho gaya!");
  };

  return (
    <div className="card">
      <h2>
        <i className="fa-solid fa-folder-open"></i> MBDRS Student Records
      </h2>

      {/* Class Selection Buttons */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "8px",
          marginBottom: "30px",
          marginTop: "20px",
        }}
      >
        {classes.map((c) => (
          <button
            key={c}
            onClick={() => {
              setSelectedClass(c);
              setSearchTerm("");
            }}
            className={selectedClass === c ? "active-btn" : "plain-btn"}
          >
            Class {c}
          </button>
        ))}
      </div>

      {selectedClass ? (
        <>
          {/* --- NAYA SEARCH BAR --- */}
          <div
            style={{
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <i
              className="fa-solid fa-magnifying-glass"
              style={{ color: "#001f4d" }}
            ></i>
            <input
              type="text"
              placeholder={`Search in Class ${selectedClass} (Name or Roll)...`}
              className="input-field"
              style={{
                maxWidth: "400px",
                border: "2px solid #001f4d",
                marginBottom: "0",
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {displayStudents.length > 0 ? (
            <div style={{ overflowX: "auto" }}>
              <h3>
                Class: {selectedClass} ({displayStudents.length} Students)
              </h3>
              <table
                border="1"
                width="100%"
                style={{
                  borderCollapse: "collapse",
                  textAlign: "left",
                  minWidth: "800px",
                  marginTop: "1rem",
                }}
              >
                <thead>
                  <tr style={{ background: "#eee" }}>
                    <th style={{ padding: "10px" }}>Roll</th>
                    <th style={{ padding: "10px" }}>Student Name</th>
                    <th style={{ padding: "10px" }}>Father's Name</th>
                    <th style={{ padding: "10px" }}>DOB</th>
                    <th style={{ padding: "10px" }}>Address</th>
                    <th style={{ padding: "10px" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {displayStudents.map((s) => (
                    <tr key={s.id} className="register-row">
                      <td style={{ padding: "10px" }}>{s.roll}</td>
                      <td style={{ padding: "10px" }}>
                        {editingId === s.id ? (
                          <input
                            className="input-field"
                            value={editData.name}
                            onChange={(e) =>
                              setEditData({ ...editData, name: e.target.value })
                            }
                          />
                        ) : (
                          s.name
                        )}
                      </td>
                      <td style={{ padding: "10px" }}>
                        {editingId === s.id ? (
                          <input
                            className="input-field"
                            value={editData.fatherName}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                fatherName: e.target.value,
                              })
                            }
                          />
                        ) : (
                          s.fatherName
                        )}
                      </td>
                      <td style={{ padding: "10px" }}>
                        {editingId === s.id ? (
                          <input
                            type="date"
                            className="input-field"
                            value={editData.dob}
                            onChange={(e) =>
                              setEditData({ ...editData, dob: e.target.value })
                            }
                          />
                        ) : (
                          s.dob
                        )}
                      </td>
                      <td style={{ padding: "10px" }}>
                        {editingId === s.id ? (
                          <input
                            className="input-field"
                            value={editData.address}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                address: e.target.value,
                              })
                            }
                          />
                        ) : (
                          s.address
                        )}
                      </td>
                      <td style={{ padding: "10px" }}>
                        {editingId === s.id ? (
                          <button
                            onClick={() => saveEdit(s.id)}
                            style={{
                              background: "green",
                              color: "white",
                              padding: "5px 15px",
                              borderRadius: "5px",
                              border: "none",
                              cursor: "pointer",
                            }}
                          >
                            Save
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={() => startEdit(s)}
                              style={{
                                marginRight: "5px",
                                background: "#ffa000",
                                padding: "5px 15px",
                                borderRadius: "5px",
                                border: "none",
                                cursor: "pointer",
                                color: "white",
                              }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteStudent(s.id)}
                              style={{
                                background: "#d32f2f",
                                color: "white",
                                padding: "5px 15px",
                                borderRadius: "5px",
                                border: "none",
                                cursor: "pointer",
                              }}
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div
              style={{ textAlign: "center", padding: "40px", color: "#666" }}
            >
              <i
                className="fa-solid fa-face-frown"
                style={{ fontSize: "3rem", marginBottom: "10px" }}
              ></i>
              <h3>No match found for "{searchTerm}"</h3>
            </div>
          )}
        </>
      ) : (
        <div style={{ textAlign: "center", padding: "50px", color: "#888" }}>
          <i
            className="fa-solid fa-users"
            style={{ fontSize: "3rem", marginBottom: "15px" }}
          ></i>
          <h3>Please select a class to view records.</h3>
        </div>
      )}
    </div>
  );
};

export default ClassView;

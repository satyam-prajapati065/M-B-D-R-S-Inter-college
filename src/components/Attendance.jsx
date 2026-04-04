import React, { useState, useEffect } from "react";

const Attendance = ({ students }) => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [searchTerm, setSearchTerm] = useState("");

  // --- 1. LOCAL STORAGE SE DATA LOAD KARNA ---
  const [attendanceRecords, setAttendanceRecords] = useState(() => {
    const saved = localStorage.getItem("mbdrs_attendance");
    return saved ? JSON.parse(saved) : {};
  });

  const todayDate = new Date();
  const todayKey = `${todayDate.getFullYear()}-${String(todayDate.getMonth() + 1).padStart(2, "0")}-${String(todayDate.getDate()).padStart(2, "0")}`;

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
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // --- 2. JAB BHI DATA BADLE, USE SAVE KARNA ---
  useEffect(() => {
    localStorage.setItem("mbdrs_attendance", JSON.stringify(attendanceRecords));
  }, [attendanceRecords]);

  const getDaysInMonth = (month, year) =>
    new Date(year, month + 1, 0).getDate();
  const daysCount = getDaysInMonth(selectedMonth, selectedYear);
  const daysArray = Array.from({ length: daysCount }, (_, i) => i + 1);

  const handleAttendance = (studentId, day, status) => {
    const selectedDate = new Date(selectedYear, selectedMonth, day);
    if (selectedDate > todayDate) return;

    const dateKey = `${selectedYear}-${String(selectedMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const currentDayRecord = attendanceRecords[dateKey] || {};
    const newStatus = currentDayRecord[studentId] === status ? null : status;

    setAttendanceRecords({
      ...attendanceRecords,
      [dateKey]: { ...currentDayRecord, [studentId]: newStatus },
    });
  };

  const displayStudents = students
    .filter((s) => s.class === selectedClass)
    .filter(
      (s) =>
        s.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.roll.toString().includes(searchTerm),
    );

  const todayRecord = attendanceRecords[todayKey] || {};
  const stats = {
    total: displayStudents.length,
    present: displayStudents.filter((s) => todayRecord[s.id] === "P").length,
    absent: displayStudents.filter((s) => todayRecord[s.id] === "A").length,
  };

  return (
    <div className="card" style={{ maxWidth: "100%", overflow: "hidden" }}>
      <h2
        style={{ textAlign: "center", color: "#004d40", marginBottom: "20px" }}
      >
        <i className="fa-solid fa-calendar-check"></i> Attendance Register
      </h2>

      {/* Stats Dashboard */}
      {selectedClass && displayStudents.length > 0 && (
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <div
            style={{
              background: "#e3f2fd",
              padding: "10px",
              borderRadius: "8px",
              flex: "1",
              textAlign: "center",
              border: "1px solid #bbdefb",
            }}
          >
            <small style={{ color: "#1976d2", fontWeight: "bold" }}>
              TOTAL
            </small>
            <h3 style={{ margin: "0" }}>{stats.total}</h3>
          </div>
          <div
            style={{
              background: "#e8f5e9",
              padding: "10px",
              borderRadius: "8px",
              flex: "1",
              textAlign: "center",
              border: "1px solid #c8e6c9",
            }}
          >
            <small style={{ color: "#388e3c", fontWeight: "bold" }}>
              PRESENT
            </small>
            <h3 style={{ margin: "0" }}>{stats.present}</h3>
          </div>
          <div
            style={{
              background: "#ffebee",
              padding: "10px",
              borderRadius: "8px",
              flex: "1",
              textAlign: "center",
              border: "1px solid #ffcdd2",
            }}
          >
            <small style={{ color: "#d32f2f", fontWeight: "bold" }}>
              ABSENT
            </small>
            <h3 style={{ margin: "0" }}>{stats.absent}</h3>
          </div>
        </div>
      )}

      {/* Selectors & Search */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "20px",
          justifyContent: "center",
          background: "#f9f9f9",
          padding: "15px",
          borderRadius: "8px",
        }}
      >
        <select
          value={selectedClass}
          onChange={(e) => {
            setSelectedClass(e.target.value);
            setSearchTerm("");
          }}
          style={selectStyle}
        >
          <option value="">Select Class</option>
          {classes.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
          style={selectStyle}
        >
          {monthNames.map((m, i) => (
            <option key={m} value={i}>
              {m}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          style={{ ...selectStyle, width: "80px" }}
        />

        {selectedClass && (
          <input
            type="text"
            placeholder="Search Name/Roll..."
            style={{
              ...selectStyle,
              width: "150px",
              border: "1px solid #004d40",
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        )}
      </div>

      {selectedClass ? (
        displayStudents.length > 0 ? (
          <div
            style={{
              overflowX: "auto",
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          >
            <table
              border="1"
              style={{
                borderCollapse: "collapse",
                width: "100%",
                fontSize: "11px",
                textAlign: "center",
              }}
            >
              <thead>
                <tr style={{ background: "#004d40", color: "white" }}>
                  <th
                    style={{
                      padding: "10px",
                      position: "sticky",
                      left: 0,
                      background: "#004d40",
                      zIndex: 2,
                    }}
                  >
                    Roll
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      minWidth: "140px",
                      position: "sticky",
                      left: "40px",
                      background: "#004d40",
                      zIndex: 2,
                    }}
                  >
                    Name
                  </th>
                  {daysArray.map((day) => (
                    <th key={day} style={{ padding: "5px", minWidth: "45px" }}>
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {displayStudents.map((s) => (
                  <tr key={s.id} className="register-row">
                    <td
                      style={{
                        position: "sticky",
                        left: 0,
                        background: "#fff",
                        fontWeight: "bold",
                        borderRight: "1px solid #ddd",
                      }}
                    >
                      {s.roll}
                    </td>
                    <td
                      style={{
                        position: "sticky",
                        left: "40px",
                        background: "#fff",
                        textAlign: "left",
                        padding: "8px",
                        borderRight: "1px solid #ddd",
                      }}
                    >
                      {s.firstName}
                    </td>
                    {daysArray.map((day) => {
                      const dateKey = `${selectedYear}-${String(selectedMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                      const status = attendanceRecords[dateKey]?.[s.id];
                      const isFuture =
                        new Date(selectedYear, selectedMonth, day) > todayDate;
                      return (
                        <td
                          key={day}
                          style={{
                            padding: "4px",
                            background: isFuture ? "#f2f2f2" : "transparent",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "2px",
                            }}
                          >
                            <button
                              disabled={isFuture}
                              onClick={() => handleAttendance(s.id, day, "P")}
                              style={{
                                background:
                                  status === "P"
                                    ? "#28a745"
                                    : isFuture
                                      ? "#e0e0e0"
                                      : "#eee",
                                color: status === "P" ? "white" : "#999",
                                border: "none",
                                fontSize: "10px",
                                padding: "2px",
                                cursor: isFuture ? "not-allowed" : "pointer",
                                borderRadius: "2px",
                                opacity: isFuture ? 0.5 : 1,
                              }}
                            >
                              P
                            </button>
                            <button
                              disabled={isFuture}
                              onClick={() => handleAttendance(s.id, day, "A")}
                              style={{
                                background:
                                  status === "A"
                                    ? "#dc3545"
                                    : isFuture
                                      ? "#e0e0e0"
                                      : "#eee",
                                color: status === "A" ? "white" : "#999",
                                border: "none",
                                fontSize: "10px",
                                padding: "2px",
                                cursor: isFuture ? "not-allowed" : "pointer",
                                borderRadius: "2px",
                                opacity: isFuture ? 0.5 : 1,
                              }}
                            >
                              A
                            </button>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "60px",
              color: "#666",
              background: "#f9f9f9",
              borderRadius: "10px",
              border: "2px dashed #ccc",
            }}
          >
            <i
              className="fa-solid fa-user-slash"
              style={{
                fontSize: "3.5rem",
                marginBottom: "15px",
                color: "#ccc",
              }}
            ></i>
            <h3 style={{ margin: "0" }}>No Students Found</h3>
          </div>
        )
      ) : (
        <div style={{ textAlign: "center", padding: "40px", color: "#888" }}>
          <i
            className="fa-solid fa-arrow-pointer"
            style={{ fontSize: "2rem", marginBottom: "10px", display: "block" }}
          ></i>
          Please select a class.
        </div>
      )}
    </div>
  );
};

const selectStyle = {
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};
export default Attendance;

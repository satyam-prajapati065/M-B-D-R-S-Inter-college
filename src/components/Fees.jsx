import React, { useState } from "react";
import signatureImg from "../assets/signature.png";

const Fees = ({ students }) => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [paidStatus, setPaidStatus] = useState({});
  const [receipt, setReceipt] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Naya Search State

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
  const months = [
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
    "January",
    "February",
    "March",
  ];

  const handlePayment = (student, month) => {
    setPaidStatus((prev) => ({
      ...prev,
      [student.id]: { ...prev[student.id], [month]: true },
    }));

    setReceipt({
      college: "MAA BRAHMA DEVI RAMA SHANKAR INTER COLLEGE",
      name: `${student.firstName} ${student.lastName}`,
      fatherName: student.fatherName,
      class: student.class,
      roll: student.roll,
      month: month,
      amount: "600",
      date: new Date().toLocaleDateString("en-GB"),
      receiptNo: Math.floor(100000 + Math.random() * 900000),
    });
  };

  // --- Search & Class Filter Logic ---
  const displayStudents = students
    .filter((s) => s.class === selectedClass)
    .filter(
      (s) =>
        s.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.roll.toString().includes(searchTerm),
    );

  return (
    <div className="card">
      <h2>
        <i className="fa-solid fa-file-invoice-dollar"></i> Fees Collection
      </h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "8px",
          marginBottom: "20px",
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

      {/* SEARCH BAR */}
      {selectedClass && (
        <div style={{ marginBottom: "15px" }}>
          <input
            type="text"
            placeholder="Search by Name or Roll No..."
            className="input-field"
            style={{ maxWidth: "300px", border: "2px solid #001f4d" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      {!selectedClass && (
        <div style={{ textAlign: "center", padding: "50px", color: "#888" }}>
          <i
            className="fa-solid fa-arrow-pointer"
            style={{
              fontSize: "2.5rem",
              marginBottom: "15px",
              display: "block",
            }}
          ></i>
          <h3>Please select a class.</h3>
        </div>
      )}

      {selectedClass &&
        (displayStudents.length > 0 ? (
          <div className="fees-table-container" style={{ overflowX: "auto" }}>
            <h3>Class {selectedClass} - Fees Record</h3>
            <table
              border="1"
              width="100%"
              style={{
                borderCollapse: "collapse",
                minWidth: "800px",
                marginTop: "10px",
              }}
            >
              <thead>
                <tr style={{ background: "#f8f9fa" }}>
                  <th>Roll</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Father's Name</th>
                  <th>DOB</th>
                  <th>Month</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {displayStudents.map((s) => (
                  <tr key={s.id}>
                    <td>{s.roll}</td>
                    <td>{s.firstName}</td>
                    <td>{s.lastName}</td>
                    <td>{s.fatherName}</td>
                    <td>{s.dob}</td>
                    <td>
                      <select id={`month-${s.id}`} style={{ padding: "5px" }}>
                        {months.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          handlePayment(
                            s,
                            document.getElementById(`month-${s.id}`).value,
                          )
                        }
                        style={{
                          background: "#28a745",
                          color: "white",
                          padding: "5px 10px",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Pay & Receipt
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
            <i
              className="fa-solid fa-money-bill-transfer"
              style={{ fontSize: "3rem", marginBottom: "10px" }}
            ></i>
            <h3>No Records Found</h3>
          </div>
        ))}

      {/* Modal code remains same */}
      {receipt && (
        <div className="modal-overlay">
          <div className="receipt-box">
            <button
              onClick={() => setReceipt(null)}
              style={{
                float: "right",
                background: "red",
                color: "white",
                border: "none",
                cursor: "pointer",
                padding: "4px 9px",
                borderRadius: "3px",
              }}
            >
              X
            </button>
            <div
              id="printable-receipt"
              style={{
                padding: "20px",
                border: "2px solid #333",
                textAlign: "left",
              }}
            >
              <h2 style={{ textAlign: "center", margin: 0 }}>
                {receipt.college}
              </h2>
              <p style={{ textAlign: "center" , marginBottom:"1rem"}}>
                Akbarpur, Ambedkar Nagar, Uttar Pradesh
              </p>
              <hr style={{ marginTop:"1rem", marginBottom:"1rem"}} />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>
                  <b>Receipt No:</b> #{receipt.receiptNo}
                </p>
                <p>
                  <b>Date:</b> {receipt.date}
                </p>
              </div>
              <p style={{ marginTop: "1rem" }}>
                <b>Student:</b> {receipt.name} | <b>Father:</b>{" "}
                {receipt.fatherName}
              </p>
              <p style={{ marginTop: "0.4rem" }}>
                <b>Class:</b> {receipt.class} | <b>Roll No:</b> {receipt.roll}
              </p>
              <p style={{ marginTop: "0.4rem" }}>
                <b>Fees Month:</b> {receipt.month}
              </p>
              <h3
                style={{
                  background: "#eee",
                  padding: "10px",
                  marginTop: "1.5rem",
                }}
              >
                Total Paid: ₹{receipt.amount}
              </h3>
              <div style={{ marginTop: "20px", textAlign: "right" }}>
                <img
                  src={signatureImg}
                  alt="Signature"
                  style={{ width: "80px" }}
                />
                <p style={{ fontSize: "10px" }}>Principal Signature</p>
              </div>
            </div>
            <button
              onClick={() => window.print()}
              style={{
                marginTop: "10px",
                width: "100%",
                background: "#001f4d",
                color: "white",
                padding: "10px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Print 🖨️
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Fees;

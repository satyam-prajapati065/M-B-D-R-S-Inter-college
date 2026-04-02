import React from "react";

const ConfirmModal = ({ isOpen, type, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  // Type ke hisaab se Title aur Button Text set karna
  const isConfirm = type === "confirm";
  const title = isConfirm
    ? "Are you sure?"
    : type === "success"
      ? "Success!"
      : "Notification";
  const confirmBtnText = isConfirm ? "Yes, Delete" : "Okay";
  const icon = type === "success" ? "✅" : isConfirm ? "⚠️" : "❌";

  return (
    <div className="modal-overlay">
      <div
        className={`custom-box ${isConfirm ? "confirm-pop" : "success-pop"}`}
      >
        <div
          className="box-icon"
          style={{ fontSize: "3rem", marginBottom: "15px" }}
        >
          {icon}
        </div>
        <h2
          style={{
            color:
              type === "success"
                ? "#28a745"
                : isConfirm
                  ? "#d32f2f"
                  : "#f44336",
            marginBottom: "10px",
          }}
        >
          {title}
        </h2>
        <p
          style={{
            fontWeight: "500",
            fontSize: "1.1rem",
            marginBottom: "20px",
            color: "#333",
          }}
        >
          {message}
        </p>

        <div
          className="box-buttons"
          style={{ display: "flex", gap: "10px", justifyContent: "center" }}
        >
          {/* Cancel button sirf 'confirm' (Delete) wale case mein dikhega */}
          {isConfirm && (
            <button
              className="btn-cancel"
              onClick={onCancel}
              style={{
                background: "#ccc",
                color: "#333",
                padding: "10px 20px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Cancel
            </button>
          )}

          <button
            className="btn-confirm"
            onClick={onConfirm}
            style={{
              background: isConfirm ? "#d32f2f" : "#001f4d",
              color: "white",
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {confirmBtnText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

import React, { useState, useEffect } from "react";
import { Alert } from "@mui/material";
import Modal from "react-modal";
import emailValidationSchema from "../validation/emailValidation";
Modal.setAppElement("#root");

const PasswordResetPopup = ({ isOpen, onClose, onResetPassword }) => {
  const [email, setEmail] = useState("");
  const [buttonValid, setButtonValid] = useState(false);
  const [inputsErrorsState, setInputsErrorsState] = useState(null);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  useEffect(() => {
    let theEmail = {};
    theEmail.email = email;
    const joiResponse = emailValidationSchema(theEmail);
    setInputsErrorsState(joiResponse);
    if (!joiResponse && email) {
      setButtonValid(true);
    } else {
      setButtonValid(false);
    }
  }, [email]);
  const handleSubmit = (e) => {
    e.preventDefault();
    onResetPassword(email);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Forgot Password"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        content: {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "30rem",
          height: "15rem",
          backgroundColor: "lightyellow",
          padding: "20px",
          color: "black",
        },
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          {inputsErrorsState && email && inputsErrorsState.email && (
            <Alert severity="warning">
              {inputsErrorsState.email.map((item) => (
                <div key={"email-errors" + item}>{item}</div>
              ))}
            </Alert>
          )}

          <button type="submit" disabled={!buttonValid}>
            Reset Password
          </button>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </Modal>
  );
};

export default PasswordResetPopup;

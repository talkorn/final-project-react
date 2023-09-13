import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Alert } from "@mui/material";
import ROUTES from "../routes/ROUTES";
import { useNavigate } from "react-router-dom";
import passwordValidationSchema from "../validation/passwordChangeValidation";

function ResetPasswordForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const [newPassword, setNewPassword] = useState("");
  const [buttonValid, setButtonValid] = useState(false);
  const [inputsErrorsState, setInputsErrorsState] = useState(null);
  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };
  useEffect(() => {
    let pass = {};
    pass.password = newPassword;
    const joiResponse = passwordValidationSchema(pass);
    setInputsErrorsState(joiResponse);
    if (!joiResponse && newPassword) {
      setButtonValid(true);
    } else {
      setButtonValid(false);
    }
  }, [newPassword]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8181/api/changePassword/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, newPassword }),
        }
      );

      if (response.ok) {
        toast.success("Password has been changed");
        navigate(ROUTES.LOGIN);
      } else {
        console.error("Password reset failed");
        toast.error("Password reset failed");
      }
    } catch (error) {
      toast.error(error.response ? error.response.data : "An error occurred.");
      console.error("Password reset failed:", error);
    }
  };

  return (
    <div>
      <h2>Reset Your Password</h2>
      <form onSubmit={handleSubmit}>
        <label>New Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={handleNewPasswordChange}
          required
        />
        {inputsErrorsState && newPassword && inputsErrorsState.password && (
          <Alert severity="warning">
            {inputsErrorsState.password.map((item) => (
              <div key={"password-errors" + item}>{item}</div>
            ))}{" "}
          </Alert>
        )}
        <button type="submit" disabled={!buttonValid}>
          Reset Password
        </button>
        <br />
        <br />
        <br />
        <br />
      </form>
    </div>
  );
}

export default ResetPasswordForm;

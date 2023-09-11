import { useState, useMemo } from "react";
import { TextField, Button, Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import "react-toastify/dist/ReactToastify.css";
import contactValidationSchema from "../validation/contactValidation";
import { useEffect } from "react";
import { Alert } from "@mui/material";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [buttonValid, setButtonValid] = useState(false);
  const [inputsErrorsState, setInputsErrorsState] = useState(null);

  const formData = useMemo(
    () => ({
      name,
      email,
      message,
    }),
    [name, email, message]
  );

  useEffect(() => {
    const joiResponse = contactValidationSchema(formData);
    setInputsErrorsState(joiResponse);
    if (!joiResponse && email && name && message) {
      setButtonValid(true);
    } else {
      setButtonValid(false);
    }
  }, [name, email, message, formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      await response.json();
      toast.success("Thank you for your message");
      navigate(ROUTES.HOME);
    } catch (error) {
      console.error(error);
      toast.error(error.response.statusText);
    }
  };
  return (
    <Box>
      <CssBaseline />
      <h1 style={{ fontFamily: "Pangolin", textAlign: "center" }}>
        Contact Us
      </h1>
      <div>
        <h2>
          We're thrilled to hear from you! Whether you have a question,
          suggestion, or just want to say hello, feel free to reach out to us
        </h2>
      </div>
      <Box sx={{ maxWidth: 600, mx: "auto", p: 2 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
          />
          {inputsErrorsState && name && inputsErrorsState.name && (
            <Alert severity="warning">
              {inputsErrorsState.name.map((item) => (
                <div key={"name-errors" + item}>{item}</div>
              ))}
            </Alert>
          )}
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            type="email"
          />
          {inputsErrorsState && email && inputsErrorsState.email && (
            <Alert severity="warning">
              {inputsErrorsState.email.map((item) => (
                <div key={"email-errors" + item}>{item}</div>
              ))}
            </Alert>
          )}
          <TextField
            fullWidth
            label="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            margin="normal"
            required
            multiline
            rows={4}
          />
          {inputsErrorsState && message && inputsErrorsState.message && (
            <Alert severity="warning">
              {inputsErrorsState.message.map((item) => (
                <div key={"message-errors" + item}>{item}</div>
              ))}
            </Alert>
          )}
          <Button
            disabled={!buttonValid}
            variant="contained"
            type="submit"
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
};
export default ContactForm;

import * as React from "react";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import validateSignUpSchema from "../validation/signUpValidaton";
import axios from "axios";
import UserComponent from "../components/UserComponent";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CardMedia from "@mui/material/CardMedia";
import ButtonGroup from "../components/ButtonGroup";
const SignUpPage = () => {
  const resaetInputState = {
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    imageUrl: "",
    imageAlt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zipCode: "",
    /*  biz: "" */
  };
  const [inputState, setInputState] = useState(resaetInputState);
  const navigate = useNavigate();
  const [buttonValid, setButtonValid] = useState(false);
  const [inputsErrorsState, setInputsErrorsState] = useState(null);

  useEffect(() => {
    const joiResponse = validateSignUpSchema(inputState);
    setInputsErrorsState(joiResponse);
    if (
      !joiResponse &&
      inputState.firstName &&
      inputState.lastName &&
      inputState.phone &&
      inputState.country &&
      inputState.email &&
      inputState.password &&
      inputState.city &&
      inputState.street &&
      inputState.houseNumber /* &&
      inputState.zipCode */
    ) {
      setButtonValid(true);
    } else {
      setButtonValid(false);
    }
  }, [inputState]);
  const cancleButoon = () => {
    navigate(ROUTES.HOME);
  };
  const resetButton = () => {
    setInputState(resaetInputState);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (inputsErrorsState) {
        return;
      }
      if (!inputState.zipCode) {
        delete inputState.zipCode;
      }
      inputState.isBusiness = false;
      inputState.image = {};
      inputState.name = {};
      inputState.address = {};
      inputState.address.state = inputState.state;
      inputState.address.country = inputState.country;
      inputState.address.city = inputState.city;
      inputState.address.street = inputState.street;
      inputState.address.houseNumber = inputState.houseNumber;
      inputState.address.zip = inputState.zip;
      inputState.name.first = inputState.firstName;
      inputState.name.last = inputState.lastName;
      inputState.name.middle = inputState.middleName;
      if (inputState.imageUrl) {
        inputState.image.url = inputState.imageUrl;
      } else {
        inputState.image.url =
          "https://img.freepik.com/premium-vector/blue-green-circle-with-person-icon-it_816425-2573.jpg?w=826";
      }
      if (inputState.imageAlt) {
        inputState.image.alt = inputState.imageAlt;
      } else {
        inputState.image.alt = "ramiProfile";
      }
      if (!inputState.address.state) {
        inputState.address.state = "    ";
      }
      delete inputState.imageUrl;
      delete inputState.imageAlt;
      delete inputState.firstName;
      delete inputState.middleName;
      delete inputState.lastName;
      delete inputState.state;
      delete inputState.country;
      delete inputState.city;
      delete inputState.street;
      delete inputState.houseNumber;
      delete inputState.zipCode;
      await axios.post("users", inputState);
      toast.success("Registration Completed");
      navigate(ROUTES.LOGIN);
    } catch (err) {
      console.log("error from axios", err.response);
      toast.error(err.response.data);
    }
  };
  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <CardMedia
          component="img"
          sx={{ height: 140 }}
          image={inputState.imageUrl}
          title={inputState.title}
        />
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {[
              { description: "firstName", required: true },
              { description: "middleName", required: false },
              { description: "lastName", required: true },
              { description: "phone", required: true },
              { description: "email", required: true },
              { description: "password", required: true },
              { description: "imageUrl", required: false },
              { description: "imageAlt", required: false },
              { description: "state", required: false },
              { description: "country", required: true },
              { description: "city", required: true },
              { description: "street", required: true },
              { description: "houseNumber", required: true },
              { description: "zipCode", required: false },
            ].map((props) => (
              <Grid item xs={12} sm={6} key={props.description}>
                <UserComponent
                  description={props.description}
                  inputStates={inputState}
                  onChanges={handleInputChange}
                  inputsErrorsStates={inputsErrorsState}
                  required={props.required}
                />
              </Grid>
            ))}
          </Grid>
          <ButtonGroup
            onCancel={cancleButoon}
            onRestart={resetButton}
            onSubmit={handleSubmit}
            isSubmitDisabled={!buttonValid}
          />
        </Box>
      </Box>
    </Container>
  );
};
export default SignUpPage;

import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ROUTES from "../routes/ROUTES";
import { CircularProgress } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import UserComponent from "../components/UserComponent";
import Stack from "@mui/material/Stack";
import CardMedia from "@mui/material/CardMedia";
import validateProfileSchema from "../validation/ProfilePageValidation";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const payload = useSelector((store) => store.authSlice.payload);
  const [inputsErrorsState, setInputsErrorsState] = useState("");
  const [buttonValid, setButtonValid] = useState(false);
  const [inputState, setInputState] = useState("");
  const [initialnputState, setInitialnputState] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const id = payload._id;
        const { data } = await axios.get(`users/${id}`);
        let newInputState = {
          ...data,
        };
        delete newInputState._id;
        delete newInputState._id;
        delete newInputState.createdAt;
        delete newInputState.__v;
        delete newInputState.name._id;
        delete newInputState.image._id;
        delete newInputState.address._id;

        setInputState(newInputState);
        setInitialnputState(newInputState);
      } catch (err) {
        console.log("error from axios", err.response.data);
      }
    })();
  }, []);
  useEffect(() => {
    const joiResponse = validateProfileSchema(inputState);
    setInputsErrorsState(joiResponse);

    if (
      inputState &&
      !joiResponse &&
      inputState?.name?.first &&
      inputState?.name?.last &&
      inputState.phone &&
      inputState?.address?.country &&
      inputState.email &&
      inputState?.address?.city &&
      inputState?.address?.street &&
      inputState?.address?.houseNumber
    ) {
      setButtonValid(true);
    } else {
      setButtonValid(false);
    }
  }, [inputState]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (inputsErrorsState) {
        return;
      }

      const id = payload._id;
      await axios.put(`users/${id}`, inputState);
      navigate(ROUTES.HOME);
    } catch (err) {
      console.log("error from axios", err.response.data);
    }
  };

  const handleInputChange = (ev) => {
    const { id, value } = ev.target;
    console.log(id);
    let newInputState = JSON.parse(JSON.stringify(inputState));
    if (typeof id === "string" && id.includes(".")) {
      const [nestedProperty, nestedKey] = id.split(".");
      newInputState[nestedProperty][nestedKey] = value;
      console.log(typeof newInputState[nestedProperty][nestedKey]);
    } else {
      console.log(" newInputState[id]", newInputState[id]);
      console.log(" value", value);
      newInputState[id] = value;
      console.log(" newInputState.id", newInputState.id);
      console.log(" newInputState", newInputState);
    }

    setInputState(newInputState);
  };
  const resetButton = () => {
    setInputState(initialnputState);
  };
  const cancleButoon = () => {
    navigate(ROUTES.HOME);
  };
  if (!inputState) {
    return <CircularProgress />;
  }
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
          <EditIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Profile Page
        </Typography>
        <CardMedia
          component="img"
          sx={{ height: 140 }}
          image={inputState.image.url}
          title={inputState.image.title}
        />{" "}
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {[
              { description: "name.first", required: true },
              { description: "name.middle", required: false },
              { description: "name.last", required: true },
              { description: "phone", required: true },
              { description: "email", required: true },
              { description: "image.url", required: false },
              { description: "image.alt", required: false },
              { description: "address.state", required: false },
              { description: "address.country", required: true },
              { description: "address.city", required: true },
              { description: "address.street", required: true },
              { description: "address.houseNumber", required: true },
              { description: "address.zip", required: false },
            ].map((props, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <UserComponent
                  description={props.description}
                  inputStates={inputState}
                  onChanges={handleInputChange}
                  inputsErrorsStates={inputsErrorsState}
                  required={props.required}
                />
              </Grid>
            ))}
            <Stack xs={12} sx={{ m: 2 }} spacing={2} direction="row">
              <Button onClick={cancleButoon} variant="outlined" color="error">
                Cancle
              </Button>
              <Button
                onClick={() => resetButton()}
                variant="outlined"
                color="success"
              >
                <RestartAltIcon />
              </Button>
            </Stack>

            <Button
              onClick={handleSubmit}
              type="submit"
              disabled={!buttonValid}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save
            </Button>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default ProfilePage;

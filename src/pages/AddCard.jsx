import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ROUTES from "../routes/ROUTES";
import { CircularProgress } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import UserComponent from "../components/UserComponent";
import Stack from "@mui/material/Stack";
import CardMedia from "@mui/material/CardMedia";
import validateEditCardSchema from "../validation/cardValidation.js";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
const CardPage = () => {
  const [inputsErrorsState, setInputsErrorsState] = useState(null);
  const [buttonValid, setButtonValid] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const categories = ["earrings", "necklaces", "bracelets"];
  const initialCard = {
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    colors: "",
    image: {
      url: "",
      alt: "",
    },
  };
  const [inputState, setInputState] = useState(initialCard);
  const navigate = useNavigate();
  useEffect(() => {
    const joiResponse = validateEditCardSchema(inputState);
    setInputsErrorsState(joiResponse);
    if (
      inputState &&
      !joiResponse &&
      inputState.title &&
      inputState.price &&
      inputState.stock &&
      inputState.category &&
      inputState.colors &&
      inputState.description
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
      if (inputState.image && inputState.image.url === "") {
        inputState.image = {
          url: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
          alt: "gjj",
        };
      }
      await axios.post("/cards/", inputState);
      toast.success("Great! a new Jewelry Card has been created");
      navigate(ROUTES.MYCARDS);
    } catch (err) {
      console.log("error from axios", err);
      toast.error(err.response.data);
    }
  };
  const handleInputChange = (ev) => {
    const { id, value } = ev.target;
    let newInputState = JSON.parse(JSON.stringify(inputState));
    if (typeof id === "string" && id.includes(".")) {
      const [nestedProperty, nestedKey] = id.split(".");
      newInputState[nestedProperty][nestedKey] = value;
    } else {
      newInputState[id] = value;
    }
    setInputState(newInputState);
    setSelectedCategory(newInputState.category);
  };
  const resetButton = () => {
    setInputState(initialCard);
    setButtonValid(false);
  };
  const cancleButoon = () => {
    navigate(ROUTES.HOME);
  };
  const handleCategoryChange = (event) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState.category = event.target.value;
    setInputState(newInputState);
    setSelectedCategory(event.target.value);
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
          <AddCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add Card
        </Typography>
        <CardMedia
          component="img"
          sx={{ height: 140 }}
          image={inputState.image.url}
          title={inputState.image.alt}
        />
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {[
              { description: "title", required: true },
              { description: "description", required: true },
              { description: "image.url", required: false },
              { description: "image.alt", required: false },
              { description: "price", required: true },
              { description: "stock", required: true },
              { description: "category", required: true },
              { description: "colors", required: true },
            ].map((props, index) => (
              <Grid item xs={12} sm={6} key={index}>
                {props.description === "category" ? (
                  <React.Fragment>
                    <Typography>Category</Typography>
                    <Select
                      value={selectedCategory}
                      onChange={handleCategoryChange}
                    >
                      {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                  </React.Fragment>
                ) : (
                  <UserComponent
                    description={props.description}
                    inputStates={inputState}
                    onChanges={handleInputChange}
                    inputsErrorsStates={inputsErrorsState}
                    required={props.required}
                  />
                )}
              </Grid>
            ))}
            <Stack xs={12} sx={{ m: 2 }} spacing={2} direction="row">
              <Button
                onClick={cancleButoon}
                fullWidth
                variant="outlined"
                color="error"
              >
                Cancle
              </Button>
              <Button
                onClick={() => resetButton()}
                fullWidth
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
export default CardPage;

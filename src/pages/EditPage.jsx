import { useState, useEffect } from "react";
import { Button, Grid, Stack, MenuItem, Select } from "@mui/material";
import { Box, Typography, Container } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ROUTES from "../routes/ROUTES";
import validateIdCardParamsSchema from "../validation/idValidation";
import { CircularProgress } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import UserComponent from "../components/UserComponent";
import validateEditCardSchema from "../validation/cardValidation";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditComponent from "../components/Editcomponent";
const CardPage = () => {
  const { id } = useParams();
  const [inputsErrorsState, setInputsErrorsState] = useState("");
  const [buttonValid, setButtonValid] = useState(false);
  const [inputState, setInputState] = useState("");
  const [initialnputState, setInitialnputState] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const categories = ["earrings", "necklaces", "bracelets"];
  const navigate = useNavigate();
  const alowAmoty = true;
  useEffect(() => {
    (async () => {
      try {
        if (!id) {
          return;
        }
        const errors = validateIdCardParamsSchema({ id });
        if (errors) {
          navigate("/");
          return;
        }
        const { data } = await axios.get("/cards/" + id);
        let newInputState = {
          ...data,
        };
        if (data.image && !data.zipCode) {
          newInputState.zipCode = "";
        }
        delete newInputState.image._id;
        delete newInputState.likes;
        delete newInputState.zipCode;
        delete newInputState._id;
        delete newInputState.__v;
        delete newInputState.user_id;
        delete newInputState.bizNumber;
        delete newInputState.createdAt;
        setInputState(newInputState);
        setInitialnputState(newInputState);
        setSelectedCategory(newInputState.category);
      } catch (err) {
        console.log("error from axios", err);
      }
    })();
  }, [id, navigate]);
  useEffect(() => {
    const joiResponse = validateEditCardSchema(inputState);
    setInputsErrorsState(joiResponse);

    if (
      inputState &&
      !joiResponse &&
      inputState.title &&
      inputState.price &&
      inputState.stock &&
      inputState.image.url &&
      inputState.image.alt &&
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
      await axios.put("/cards/" + id, inputState);
      toast.success("the card has been updated");
      navigate(ROUTES.HOME);
    } catch (err) {
      toast.error(err.response.data.codeName);
      console.log("error from axios", err.response);
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
  };
  const resetButton = () => {
    setInputState(initialnputState);
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

      <EditComponent url={inputState.image.url} title1={inputState.image.alt} />
      <Box component="form" noValidate sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          {[
            { description: "title", required: true },
            { description: "description", required: true },
            { description: "price", required: true },
            { description: "stock", required: true },
            { description: "category", required: true },
            { description: "colors", required: true },
            { description: "image.url", required: false },
            { description: "image.alt", required: false },
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
                  allowToBeEmpty={alowAmoty}
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
    </Container>
  );
};
export default CardPage;

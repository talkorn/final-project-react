import { useState, useEffect } from "react";
import { Grid, CardMedia, Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ROUTES from "../routes/ROUTES";
import { CircularProgress } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import UserComponent from "../components/UserComponent";
import validateProfileSchema from "../validation/ProfilePageValidation";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileComponent from "../components/profilecom/ProfileComponent";
import ProfileForm from "../components/profilecom/ProfileForm";

const ProfilePage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const payload = useSelector((store) => store.authSlice.payload);
  const [inputsErrorsState, setInputsErrorsState] = useState({});
  const [buttonValid, setButtonValid] = useState(false);
  const [inputState, setInputState] = useState({
    name: {
      first: "",
      middle: "",
      last: "",
    },
    phone: "",
    email: "",
    address: {
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: "",
      zip: "",
    },
    image: { url: "", alt: "Profile Image" }, // Include image property
  });
  const [initialnputState, setInitialnputState] = useState("");
  const navigate = useNavigate();
  const alowAmoty = true;
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
  }, [payload._id]);
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
      let updatedInputState = { ...inputState };
      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);
        const { data } = await axios.post(`users/${id}/image`, formData);
        updatedInputState = {
          ...updatedInputState,
          image: {
            url: "http://localhost:8181/" + data.imageUrl,
            alt: "Profile Image",
          },
        };
      }
      await axios.put(`users/${id}`, updatedInputState);
      window.location.reload();
      toast.success("Profile update completed");
    } catch (err) {
      toast.error(err.response.data);
      console.log("error from axios", err.response.data);
    }
  };
  const handleInputChange = (ev) => {
    const { id, value, files } = ev.target;
    let newInputState = JSON.parse(JSON.stringify(inputState));
    if (typeof id === "string" && id.includes(".")) {
      const [nestedProperty, nestedKey] = id.split(".");
      newInputState[nestedProperty][nestedKey] = value;
    } else {
      newInputState[id] = value;
    }
    if (files && files[0]) {
      setSelectedImage(files[0]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(files[0]);
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
      <ProfileComponent />
      <CardMedia
        component="img"
        sx={{ height: 140 }}
        image={imagePreviewUrl || inputState.image.url}
        title={inputState.image.alt}
      />
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
                allowToBeEmpty={alowAmoty}
              />
            </Grid>
          ))}
          <ProfileForm
            inputState={inputState}
            imagePreviewUrl={imagePreviewUrl}
            handleInputChange={handleInputChange}
            inputsErrorsState={inputsErrorsState}
            buttonValid={buttonValid}
            handleSubmit={handleSubmit}
            onCancel={cancleButoon}
            onReset={resetButton}
          />
        </Grid>
      </Box>
    </Container>
  );
};
export default ProfilePage;

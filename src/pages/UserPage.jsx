import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import PersonIcon from "@mui/icons-material/Person";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import UserComponent from "../components/UserComponent";
import CardMedia from "@mui/material/CardMedia";
import validateIdCardParamsSchema from "../validation/idValidation";

const UserPage = () => {
  const { id } = useParams();
  const [inputState, setInputState] = useState("");
  const navigate = useNavigate();
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
        let newInputState;
        const { data } = await axios.get("users");
        if (data) {
          let userInfo = data;
          userInfo = userInfo.find((item) => item._id === id);
          newInputState = {
            ...userInfo,
          };
        }
        if (newInputState.name.middle === "") {
          newInputState.name.middle = "-";
        }
        setInputState(newInputState);
      } catch (err) {
        console.log("error from axios", err);
      }
    })();
  }, []);

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
          <PersonIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          User Page
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
                  required={props.required}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default UserPage;

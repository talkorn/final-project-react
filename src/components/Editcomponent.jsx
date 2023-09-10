import { Box, Typography, Avatar, CardMedia, Container } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PropTypes from "prop-types";
const EditComponent = (url, title1) => {
  return (
    <Container component="main" maxWidth="xs">
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
          Edit Page
        </Typography>
        <CardMedia
          component="img"
          sx={{ height: 250 }}
          image={url.url}
          title={title1.title1}
        />
      </Box>
    </Container>
  );
};
EditComponent.Prototype = {
  url: PropTypes.string,
  title1: PropTypes.string,
};
export default EditComponent;

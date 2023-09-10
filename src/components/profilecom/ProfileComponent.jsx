import { Box, Typography, Avatar, Container } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const ProfileComponent = () => {
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
          Profile Page
        </Typography>
      </Box>
    </Container>
  );
};
export default ProfileComponent;

import React from "react";
import { Box, Container, CssBaseline, Grid, Button } from "@mui/material";
import FileInput from "./ProfileInput";
import ActionButtons from "./ProfileButton";
const ProfileForm = ({
  handleInputChange,
  buttonValid,
  handleSubmit,
  onCancel,
  onReset,
}) => {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {/* Render your profile components here */}
      <FileInput onChange={handleInputChange} />
      <Box component="div" noValidate sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          {/* Map through your user components here */}

          <ActionButtons onCancel={onCancel} onReset={onReset} />
          {/* Your other user components */}
        </Grid>
      </Box>
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
    </Container>
  );
};

export default ProfileForm;

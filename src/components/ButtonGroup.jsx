import React from "react";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import PropTypes from "prop-types";
const ButtonGroup = ({ onCancel, onRestart, onSubmit, isSubmitDisabled }) => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(ROUTES.HOME);
    if (onCancel) onCancel();
  };

  return (
    <div>
      <Stack xs={12} spacing={3} direction="row" sx={{ m: 2 }}>
        <Button
          onClick={handleCancel}
          fullWidth
          variant="outlined"
          color="error"
        >
          Cancel
        </Button>
        <Button
          onClick={onRestart}
          fullWidth
          variant="outlined"
          color="success"
        >
          <RestartAltIcon />
        </Button>
      </Stack>
      <Button
        type="submit"
        disabled={isSubmitDisabled}
        fullWidth
        variant="contained"
      >
        Sign Up
      </Button>
    </div>
  );
};
ButtonGroup.Prototype = {
  onCancel: PropTypes.func,
  onRestart: PropTypes.func,
  onSubmit: PropTypes.func,
  isSubmitDisabled: PropTypes.func,
};
export default ButtonGroup;

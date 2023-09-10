import React from "react";
import { Button, Stack } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import PropTypes from "prop-types";
const ActionButtons = ({ onCancel, onReset }) => {
  return (
    <Stack xs={12} sx={{ m: 2 }} spacing={2} direction="row">
      <Button onClick={onCancel} variant="outlined" color="error">
        Cancel
      </Button>
      <Button onClick={onReset} variant="outlined" color="success">
        <RestartAltIcon />
      </Button>
    </Stack>
  );
};
ActionButtons.Prototype = {
  onCancel: PropTypes.func,
  onResetPropTypes: PropTypes.func,
};
export default ActionButtons;

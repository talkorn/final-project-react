import React from "react";
import { Button } from "@mui/material";
import PropTypes from "prop-types";
const FileInput = ({ onChange }) => {
  return (
    <>
      <input
        accept="image/*"
        id="imageFile"
        type="file"
        onChange={onChange}
        style={{ display: "none" }}
      />
      <label htmlFor="imageFile">
        <Button component="span" variant="outlined" color="primary">
          Upload Image
        </Button>
      </label>
    </>
  );
};
FileInput.Prototype = {
  onChange: PropTypes.func,
};
export default FileInput;

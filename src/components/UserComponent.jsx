import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { Fragment } from "react";
import PropTypes from "prop-types";

const UserComponent = (userArr) => {
  const allowToBeEmpty = userArr.allowToBeEmpty;
  const descriptions = userArr.description;
  const descriptionsForError = userArr.description.includes(".")
    ? userArr.description.split(".")[1] // Extract the second word after the dot
    : userArr.description;
  const inputStates = userArr.inputStates;
  const onChanges = userArr.onChanges;
  const inputsErrorsStates = userArr.inputsErrorsStates;
  const requireds = userArr.required;
  const nestedProperty = descriptions
    .split(".")
    .reduce((obj, key) => obj[key], inputStates);

  return (
    <Fragment>
      <TextField
        required={requireds}
        fullWidth
        id={descriptions}
        type={descriptions}
        label={descriptions}
        name={descriptions}
        autoComplete={descriptions}
        value={nestedProperty}
        onChange={onChanges}
      />
      {allowToBeEmpty
        ? inputsErrorsStates &&
          inputsErrorsStates[descriptionsForError] && (
            <Alert severity="warning">
              {descriptions === "password" ? (
                <div>
                  password should contain at least one uppercase and one
                  lowercase letter. Length should be between 6 and 10.
                </div>
              ) : (
                inputsErrorsStates[descriptionsForError].map((item) => (
                  <div key={descriptions + "-errors" + item}>{item}</div>
                ))
              )}
            </Alert>
          )
        : inputsErrorsStates &&
          inputStates[descriptions] &&
          inputsErrorsStates[descriptionsForError] && (
            <Alert severity="warning">
              {descriptions === "password" ? (
                <div>
                  password should contain at least one uppercase and one
                  lowercase letter. Length should be between 6 and 10.
                </div>
              ) : (
                inputsErrorsStates[descriptionsForError].map((item) => (
                  <div key={descriptions + "-errors" + item}>{item}</div>
                ))
              )}
            </Alert>
          )}
    </Fragment>
  );
};

UserComponent.propTypes = {
  userArr: PropTypes.array,
};

export default UserComponent;

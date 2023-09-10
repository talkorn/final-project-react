import React from "react";
import {
  TableCell,
  TableRow,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";
import { Alert } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";
const UserTable = ({
  user,
  editedUserId,
  handleInputChange,
  deleteUser,
  handleSubmit,
  buttonValid,
  openUserCard,
  inputsErrorsState,
}) => {
  return (
    <TableRow
      key={user._id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        <input
          type="text"
          value={user.name.first}
          description={"name.first"}
          onChange={(ev) => handleInputChange(ev, user._id, "name.first")}
        />
        {user._id === editedUserId &&
          inputsErrorsState &&
          user.name?.first &&
          inputsErrorsState.first && (
            <Alert severity="warning">
              {inputsErrorsState.first.map((item) => (
                <div key={"first name-errors" + item}>{item}</div>
              ))}
            </Alert>
          )}
      </TableCell>
      <TableCell align="right">
        <input
          type="text"
          value={user.name.last}
          description={"name.last"}
          onChange={(ev) => handleInputChange(ev, user._id, "name.last")}
        />
        {user._id === editedUserId &&
          inputsErrorsState &&
          user.name?.last &&
          inputsErrorsState.last && (
            <Alert severity="warning">
              {inputsErrorsState.last.map((item) => (
                <div key={"last name-errors" + item}>{item}</div>
              ))}
            </Alert>
          )}
      </TableCell>
      <TableCell align="right" onClick={() => openUserCard(user._id)}>
        {user._id}
      </TableCell>
      <TableCell align="right">
        <input
          type="text"
          value={user.phone}
          description={"phone"}
          onChange={(ev) => handleInputChange(ev, user._id, "phone")}
        />
        {user._id === editedUserId &&
          inputsErrorsState &&
          user.phone &&
          inputsErrorsState.phone && (
            <Alert severity="warning">
              {inputsErrorsState.phone.map((item) => (
                <div key={"phone-errors" + item}>{item}</div>
              ))}
            </Alert>
          )}
      </TableCell>
      <TableCell align="right">
        <input
          type="text"
          description={"email"}
          value={user.email}
          onChange={(ev) => handleInputChange(ev, user._id, "email")}
        />
        {user._id === editedUserId &&
          inputsErrorsState &&
          user.email &&
          inputsErrorsState.email && (
            <Alert severity="warning">
              {inputsErrorsState.email.map((item) => (
                <div key={"email-errors" + item}>{item}</div>
              ))}
            </Alert>
          )}
      </TableCell>
      <TableCell align="right">
        <FormControlLabel
          control={
            <Checkbox
              checked={user.isAdmin}
              onChange={(ev) => handleInputChange(ev, user._id, "isAdmin")}
              color="primary"
            />
          }
        />
      </TableCell>
      <TableCell align="right">
        {
          <Button size="small" onClick={() => deleteUser(user._id)}>
            <DeleteIcon />
          </Button>
        }
      </TableCell>
      <TableCell align="right">
        <Button
          onClick={(ev) => handleSubmit(ev, user._id)}
          disabled={user._id !== editedUserId || !buttonValid}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Save
        </Button>
      </TableCell>
    </TableRow>
  );
};
UserTable.Prototype = {
  user: PropTypes.object,
  editedUserId: PropTypes.string,
  handleInputChange: PropTypes.func,
  deleteUser: PropTypes.func,
  handleSubmit: PropTypes.func,
  buttonValid: PropTypes.bool,
  openUserCard: PropTypes.func,
  inputsErrorsState: PropTypes.array,
};
export default UserTable;

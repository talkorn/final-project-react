import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { Grid } from "@mui/material";
import validateProfileSchema from "../validation/ProfilePageValidation";

import "react-toastify/dist/ReactToastify.css";
const CrmTable = () => {
  const [initialuserData, setIntialUserData] = useState(null);
  const [initialData, setIntialData] = useState(null);
  const [buttonValid, setButtonValid] = useState(false);
  const [inputsErrorsState, setInputsErrorsState] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("users");

        setIntialData(data);
      } catch (err) {
        console.log("error from axios", err);
      }
    })();
  }, []);

  useEffect(() => {
    const updatedUser = JSON.parse(JSON.stringify(initialuserData));

    if (updatedUser) {
      delete updatedUser.isAdmin;

      delete updatedUser.createdAt;
      delete updatedUser.__v;
      delete updatedUser.name._id;
      delete updatedUser.image._id;
      delete updatedUser.address._id;
      delete updatedUser._id;
    }

    const joiResponse = validateProfileSchema(updatedUser);
    console.log("joiResponse", joiResponse);
    if (joiResponse) {
      const errorMessages = Object.values(joiResponse).flat();
      if (errorMessages.length > 0) {
        errorMessages.forEach((errorMessage) => {
          /* console.log("joi", errorMessage);
          toast.error(errorMessage); */
        });
        return;
      }
    }
    setInputsErrorsState(joiResponse);

    if (
      !joiResponse &&
      updatedUser.email &&
      updatedUser.phone &&
      updatedUser.name.first &&
      updatedUser.name.last
    ) {
      console.log("here");
      setButtonValid(true);
    } else {
      setButtonValid(false);
      console.log("here???");
    }
  }, [initialuserData]);

  const openUserCard = (id) => {
    navigate(`/user/${id}`);
  };

  const deleteUser = async (id) => {
    let newInitialData = JSON.parse(JSON.stringify(initialData));
    const updatedUser = newInitialData.find((user) => user._id === id);
    if (updatedUser.isAdmin === true) {
      toast.error("sorry,you cant change this user details");
      return;
    }
    try {
      const newData = initialData.filter((user) => {
        return user._id !== id;
      });
      await axios.delete("users/deleteUser/" + id);
      setIntialData(newData);
    } catch (err) {
      console.log("error from axios", err.response.data);
    }
  };
  const handleInputChange = async (ev, id) => {
    let newInitialData = JSON.parse(JSON.stringify(initialData));
    const updatedUser = newInitialData.find((user) => user._id === id);
    console.log(updatedUser);
    if (updatedUser.isAdmin === true) {
      console.log(updatedUser);
      toast.error("sorry,you cant change this user details");
      return;
    }
    updatedUser.isBusiness = ev.target.checked;
    delete updatedUser._id;
    //delete updatedUser.isAdmin;

    try {
      const newData = initialData.map((user) => {
        if (user._id === id) {
          user.isBusiness = ev.target.checked;
        }
        return user;
      });
      let isBusiness = {};
      isBusiness.isBusiness = updatedUser.isBusiness;
      console.log(isBusiness);
      const response = await axios.patch(`/users/${id}`, isBusiness);

      setIntialData(newData);
    } catch (err) {
      console.log("error from axios", err.response);
    }
  };

  const handleInputChanges = async (ev, id, description) => {
    let newInitialData = JSON.parse(JSON.stringify(initialData));
    const updatedUser = newInitialData.find((user) => user._id === id);
    /* if (updatedUser.isAdmin === true) {
      toast.error("sorry,you cant change this user details");
      return;
    } */
    let value = ev.target.value;
    if (typeof description === "string" && description.includes(".")) {
      const [nestedProperty, nestedKey] = description.split(".");
      updatedUser[nestedProperty][nestedKey] = value;
      console.log(updatedUser);
      setIntialUserData(updatedUser);
      const newDataUser = newInitialData.map((user) => {
        if (user._id === id) {
          user = updatedUser;
        }
        return user;
      });
      setIntialData(newDataUser);
      console.log("newDataUser", newDataUser);
    } else {
      console.log(value);
      updatedUser[description] = value;
      setIntialUserData(updatedUser);
      const newDataUser = newInitialData.map((user) => {
        if (user._id === id) {
          user = updatedUser;
        }
        return user;
      });
      setIntialData(newDataUser);
    }
    /* const newData = initialData.map((user) => {
      if (user._id === id) {
        user = updatedUser;
      }
      console.log(newData);
      return user;
    }); */
  };
  const handleSubmit = async (event, id) => {
    event.preventDefault();
    try {
      const updatedUser = JSON.parse(JSON.stringify(initialuserData));
      if (!updatedUser) {
        return;
      }
      delete updatedUser.isAdmin;
      delete updatedUser.createdAt;
      delete updatedUser.__v;
      delete updatedUser.name._id;
      delete updatedUser.image._id;
      delete updatedUser.address._id;
      delete updatedUser._id;
      /*  const joiResponse = validateProfileSchema(updatedUser);
      console.log("joiResponse", joiResponse);
      if (joiResponse) {
        const errorMessages = Object.values(joiResponse).flat();
        if (errorMessages.length > 0) {
          errorMessages.forEach((errorMessage) => {
            console.log("joi", errorMessage);
            toast.error(errorMessage);
          });
          return;
        }
      } */
      const response = await axios.put(`/users/${id}`, updatedUser);

      const afterChangeData = await axios.get("users");
      console.log(afterChangeData.data);
      setIntialData(afterChangeData.data);
      /*  if (inputsErrorsState) {
        return;
      } */

      toast.success("changes has been updated");
    } catch (err) {
      console.log("error", err);
      toast.error(err.response.data.codeName);
    }
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>FirstName</TableCell>
                <TableCell align="center">LastName</TableCell>
                <TableCell align="center">Id</TableCell>
                <TableCell align="center">phone</TableCell>
                <TableCell align="center">email</TableCell>
                <TableCell align="center">biz</TableCell>
                <TableCell align="center">delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {initialData &&
                initialData.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <input
                        type="text"
                        value={row.name.first}
                        description={"name.first"}
                        onChange={(ev) =>
                          handleInputChanges(ev, row._id, "name.first")
                        }
                      />
                    </TableCell>

                    <TableCell
                      align="right"
                      //onClick={() => openUserCard(row._id)}
                    >
                      <input
                        type="text"
                        value={row.name.last}
                        description={"name.last"}
                        onChange={(ev) =>
                          handleInputChanges(ev, row._id, "name.last")
                        }
                      />
                    </TableCell>
                    <TableCell
                      align="right"
                      onClick={() => openUserCard(row._id)}
                    >
                      {row._id}
                    </TableCell>
                    <TableCell align="right">
                      <input
                        type="text"
                        value={row.phone}
                        description={"phone"}
                        onChange={(ev) =>
                          handleInputChanges(ev, row._id, "phone")
                        }
                      />
                    </TableCell>
                    <TableCell align="right">
                      <input
                        type="text"
                        description={"email"}
                        value={row.email}
                        onChange={(ev) =>
                          handleInputChanges(ev, row._id, "email")
                        }
                      />
                    </TableCell>

                    <TableCell align="right">
                      {/*  <input
                    type="checkbox"
                     value={row.isAdmin}
                    checked={row.isAdmin}
                    readOnly
                    onChange={handleInputChange}
                  /> */}
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={row.isBusiness}
                            onChange={(ev) =>
                              handleInputChange(ev, row._id, "isBusiness")
                            }
                            color="primary"
                          />
                        }
                      />
                    </TableCell>
                    <TableCell align="right">
                      {
                        <Button
                          size="small"
                          onClick={() => deleteUser(row._id)}
                        >
                          <DeleteIcon />
                        </Button>
                      }
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={(ev) => handleSubmit(ev, row._id)}
                        disabled={!buttonValid}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Save
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};
export default CrmTable;

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

const CrmTable = () => {
  const [initialData, setIntialData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("users");

        console.log(data);

        setIntialData(data);
      } catch (err) {
        console.log("error from axios", err);
      }
    })();
  }, []);
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

    if (updatedUser.isAdmin === true) {
      toast.error("sorry,you cant change this user details");
      return;
    }
    updatedUser.isBusiness = ev.target.checked;
    delete updatedUser._id;
    delete updatedUser.isAdmin;
    try {
      const newData = initialData.map((user) => {
        if (user._id === id) {
          user.isBusiness = ev.target.checked;
        }
        return user;
      });
      const response = await axios.put(`/users/userInfo/${id}`, updatedUser);
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
      console.log(typeof updatedUser[nestedProperty][nestedKey]);
    } else {
      /*   updatedUser[description] = value;
      console.log(" newInputState.id", updatedUser.id);
      console.log(" newInputState", updatedUser); */
    }
    //updatedUser[ev.target] = ev.target.value;
    console.log("updatedUser", updatedUser);
    //updatedUser.isBusiness = ev.target.checked;

    delete updatedUser.isAdmin;

    delete updatedUser.createdAt;
    delete updatedUser.__v;
    delete updatedUser.name._id;
    delete updatedUser.image._id;
    delete updatedUser.address._id;
    try {
      const newData = initialData.map((user) => {
        if (user._id === id) {
          user = updatedUser;
          console.log(user);
        }
        return user;
      });
      console.log(id);
      const response = await axios.put(`/users/${id}`, updatedUser);
      setIntialData(newData);
    } catch (err) {
      console.log("error from axios", err.response);
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
                    key={row.name.first}
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
                    <TableCell
                      align="right"
                      onClick={() => openUserCard(row._id)}
                    >
                      {row.phone}
                    </TableCell>
                    <TableCell
                      align="right"
                      onClick={() => openUserCard(row._id)}
                    >
                      {row.email}
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
                            onChange={(ev) => handleInputChange(ev, row._id)}
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

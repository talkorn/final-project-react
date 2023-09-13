import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Box,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import validateProfileSchema from "../validation/ProfilePageValidation";
import UserTable from "../components/UserTable";

const CrmTable = () => {
  const [editedUserId, setEditedUserId] = useState(null);
  const [changeOnluOnSubmit, setChangeOnluOnSubmit] = useState(null);
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
        setChangeOnluOnSubmit(data);
      } catch (err) {
        console.log("error from axios", err);
      }
    })();
  }, []);

  useEffect(() => {
    const updatedUser = JSON.parse(JSON.stringify(initialuserData));

    if (updatedUser) {
      delete updatedUser.createdAt;
      delete updatedUser.__v;
      delete updatedUser.name._id;
      delete updatedUser.image._id;
      delete updatedUser.address._id;
      delete updatedUser._id;
    }
    const joiResponse = validateProfileSchema(updatedUser);
    setInputsErrorsState(joiResponse);

    if (
      !joiResponse &&
      updatedUser.email &&
      updatedUser.phone &&
      updatedUser.name.first &&
      updatedUser.name.last
    ) {
      setButtonValid(true);
    } else {
      setButtonValid(false);
    }
  }, [initialuserData, initialData]);
  const openUserCard = (id) => {
    navigate(`/user/${id}`);
  };
  const deleteUser = async (id) => {
    let newInitialData = JSON.parse(JSON.stringify(initialData));
    const updatedUser = newInitialData.find((user) => user._id === id);
    if (updatedUser.isAdmin === true) {
      toast.error("sorry this user is Admin,you cant change his details");
      return;
    }
    try {
      const newData = initialData.filter((user) => {
        return user._id !== id;
      });
      await axios.delete("users/" + id);
      setIntialData(newData);
    } catch (err) {
      console.log("error from axios", err.response.data);
    }
  };
  const handleInputChange = async (ev, id, property) => {
    setEditedUserId(id);
    let newInitialData = JSON.parse(JSON.stringify(initialData));
    let toCheckAdmin = JSON.parse(JSON.stringify(changeOnluOnSubmit));

    const updatedUser = newInitialData.find((user) => user._id === id);
    const isYouAdmin = toCheckAdmin.find((user) => user._id === id);

    if (isYouAdmin.isAdmin === true) {
      setButtonValid(false);
      toast.error(
        "Sorry, this user is an Admin. You can't change his details."
      );
      return;
    }

    let value = ev.target.value;
    if (property.includes(".")) {
      const [nestedProperty, nestedKey] = property.split(".");
      updatedUser[nestedProperty][nestedKey] = value;
    } else if (property === "isAdmin") {
      updatedUser.isAdmin = !updatedUser.isAdmin;
    } else {
      updatedUser[property] = value;
    }

    setIntialUserData(updatedUser);
    const newDataUser = newInitialData.map((user) => {
      if (user._id === id) {
        user = updatedUser;
      }
      return user;
    });
    setIntialData(newDataUser);
  };

  const handleSubmit = async (event, id) => {
    event.preventDefault();
    try {
      const updatedUser = JSON.parse(JSON.stringify(initialuserData));
      if (!updatedUser) {
        return;
      }
      delete updatedUser.createdAt;
      delete updatedUser.__v;
      delete updatedUser.name._id;
      delete updatedUser.image._id;
      delete updatedUser.address._id;
      delete updatedUser._id;
      await axios.put(`/users/${id}`, updatedUser);
      const afterChangeData = await axios.get("users");
      setIntialData(afterChangeData.data);
      setChangeOnluOnSubmit(afterChangeData.data);
      toast.success("changes has been updated");
      setButtonValid(false);
    } catch (err) {
      console.log("error", err);
      toast.error(err.response.data.codeName);
    }
  };
  return (
    <Box>
      <h1 style={{ fontFamily: "Pangolin" }}>User information</h1>
      <h3>
        {" "}
        you can updeted the user info. For more details about a user click on
        his Id
      </h3>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div style={{ overflowX: "auto" }}>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                padding="none"
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>FirstName</TableCell>
                    <TableCell align="center">LastName</TableCell>
                    <TableCell align="center">Id</TableCell>
                    <TableCell align="center">phone</TableCell>
                    <TableCell align="center">email</TableCell>
                    <TableCell align="center">admin</TableCell>
                    <TableCell align="center">delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {initialData &&
                    initialData.map((row) => (
                      <UserTable
                        key={row._id}
                        user={row}
                        editedUserId={editedUserId}
                        handleInputChange={handleInputChange}
                        deleteUser={deleteUser}
                        handleSubmit={handleSubmit}
                        buttonValid={buttonValid}
                        openUserCard={openUserCard}
                        inputsErrorsState={inputsErrorsState}
                      />
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};
export default CrmTable;

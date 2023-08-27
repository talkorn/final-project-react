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
const FavoriteManagement = () => {
  const [initialCards, setIntialCardsData] = useState(null);
  const [initialData, setIntialData] = useState(null);
  const [buttonValid, setButtonValid] = useState(false);
  const [inputsErrorsState, setInputsErrorsState] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("cards");

        setIntialData(data);
      } catch (err) {
        console.log("error from axios", err);
      }
    })();
  }, []);
  const sortByLikes = (data) => {
    return data.slice().sort((a, b) => b.likes.length - a.likes.length);
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="center">Id</TableCell>
                <TableCell align="center">likesNumber</TableCell>
                <TableCell align="center">category</TableCell>
                <TableCell align="center">color</TableCell>
                <TableCell align="center">price</TableCell>
                <TableCell align="center">user id</TableCell>
              </TableRow>
            </TableHead>
            {/*  <TableBody>
              {initialData &&
                initialData.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <TableCell align="right">{row.title}</TableCell>
                    </TableCell>

                    <TableCell align="right">
                      {" "}
                      <TableCell align="right">{row._id}</TableCell>
                    </TableCell>

                    <TableCell align="right">
                      <TableCell align="right">{likesNumber}</TableCell>
                    </TableCell>
                    <TableCell align="right">
                      <TableCell align="right">{row.category}</TableCell>
                    </TableCell>
                    <TableCell align="right">
                      <TableCell align="right">{row.colors}</TableCell>
                    </TableCell>
                    <TableCell align="right">
                      <TableCell align="right">{row.price}</TableCell>
                    </TableCell>
                    <TableCell align="right">
                      <TableCell align="right">{row.user_id}</TableCell>
                    </TableCell>

                    <TableCell align="right"></TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                ))}
            </TableBody> */}
            <TableBody>
              {initialData &&
                sortByLikes(initialData).map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <TableCell align="right">{row.title}</TableCell>
                    </TableCell>

                    <TableCell align="right">
                      <TableCell align="right">{row._id}</TableCell>
                    </TableCell>

                    <TableCell align="right">
                      <TableCell align="right">{row.likes.length}</TableCell>
                    </TableCell>

                    <TableCell align="right">
                      <TableCell align="right">{row.category}</TableCell>
                    </TableCell>
                    <TableCell align="right">
                      <TableCell align="right">{row.colors}</TableCell>
                    </TableCell>
                    <TableCell align="right">
                      <TableCell align="right">{row.price}</TableCell>
                    </TableCell>
                    <TableCell align="right">
                      <TableCell align="right">{row.user_id}</TableCell>
                    </TableCell>

                    <TableCell align="right"></TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};
export default FavoriteManagement;

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InventoryManagement = () => {
  const [initialData, setInitialData] = useState(null);
  const [sortedData, setSortedData] = useState(null); // New state to store sorted data
  const [sortAscending, setSortAscending] = useState(true); // State to track sorting order
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("cards");
        setInitialData(data);
      } catch (err) {
        console.log("error from axios", err);
      }
    })();
  }, []);

  useEffect(() => {
    // Sort the data whenever initialData changes or sorting order changes
    if (initialData) {
      const sorted = [...initialData].sort((a, b) => {
        if (sortAscending) {
          return a.stock - b.stock;
        } else {
          return b.stock - a.stock;
        }
      });
      setSortedData(sorted);
    }
  }, [initialData, sortAscending]);

  const handleSortButtonClick = () => {
    setSortAscending((prevSortAscending) => !prevSortAscending);
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
                <TableCell align="center">
                  Stock{" "}
                  <Button onClick={handleSortButtonClick}>
                    {sortAscending ? "↑" : "↓"}
                  </Button>
                </TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Color</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">User ID</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {(sortedData || []).map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="center">{row._id}</TableCell>
                  <TableCell align="center">{row.stock}</TableCell>
                  <TableCell align="center">{row.category}</TableCell>
                  <TableCell align="center">{row.colors}</TableCell>
                  <TableCell align="center">{row.price}</TableCell>
                  <TableCell align="center">{row.user_id}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default InventoryManagement;

/* import * as React from "react";
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
import "react-toastify/dist/ReactToastify.css";
import { Grid } from "@mui/material";

import "react-toastify/dist/ReactToastify.css";
const InventoryManagement = () => {
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
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="center">Id</TableCell>
                <TableCell align="center">stock</TableCell>
                <TableCell align="center">category</TableCell>
                <TableCell align="center">color</TableCell>
                <TableCell align="center">price</TableCell>
                <TableCell align="center">user id</TableCell>
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
                      <TableCell align="right">{row.title}</TableCell>
                    </TableCell>

                    <TableCell align="right">
                      <TableCell align="right">{row._id}</TableCell>
                    </TableCell>

                    <TableCell align="right">
                      <TableCell align="right">{row.stock}</TableCell>
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
export default InventoryManagement;
 */

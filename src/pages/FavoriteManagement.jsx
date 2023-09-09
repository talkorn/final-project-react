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
import "react-toastify/dist/ReactToastify.css";
import { Grid } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";

const FavoriteManagement = () => {
  const [initialData, setIntialData] = useState(null);
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
      <h1 style={{ fontFamily: "Pangolin" }}>Favorite Data</h1>
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

            <TableBody>
              {initialData &&
                sortByLikes(initialData).map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.title}
                    </TableCell>
                    <TableCell align="right">{row._id}</TableCell>
                    <TableCell align="right">{row.likes.length}</TableCell>
                    <TableCell align="right">{row.category}</TableCell>
                    <TableCell align="right">{row.colors}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">{row.user_id}</TableCell>
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

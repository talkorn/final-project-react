import * as React from "react";
import { Table, TableBody, TableCell, TableContainer } from "@mui/material";
import { TableHead, TableRow, Paper, Button, Grid, Box } from "@mui/material";
import { Alert } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import validateEditCardSchema from "../validation/cardValidation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InventoryManagement = () => {
  const [editedUserId, setEditedUserId] = useState(null);
  const [buttonValid, setButtonValid] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [sortedData, setSortedData] = useState(null);
  const [sortAscending, setSortAscending] = useState(true);
  const [initialCardData, setIntialCardData] = useState(null);
  const [inputsErrorsState, setInputsErrorsState] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("cards");
        const sorted = [...data].sort((a, b) => {
          if (sortAscending) {
            return a.stock - b.stock;
          } else {
            return b.stock - a.stock;
          }
        });
        setSortedData(sorted);
        setInitialData(sorted);
      } catch (err) {
        console.log("error from axios", err);
      }
    })();
  }, [sortAscending]);

  useEffect(() => {
    // Sort the data whenever initialData changes or sorting order changes
    if (initialCardData) {
      const cardUpdate = JSON.parse(JSON.stringify(initialCardData));
      if (cardUpdate) {
        delete cardUpdate.likes;
        delete cardUpdate.zipCode;
        delete cardUpdate.image._id;
        delete cardUpdate._id;
        delete cardUpdate.__v;
        delete cardUpdate.user_id;
        delete cardUpdate.bizNumber;
        delete cardUpdate.createdAt;
      }
      const joiResponse = validateEditCardSchema(cardUpdate);
      setInputsErrorsState(joiResponse);
      if (!joiResponse) {
        setButtonValid(true);
      } else {
        setButtonValid(false);
      }
    }
  }, [initialCardData]);

  const handleSortButtonClick = () => {
    setSortAscending((prevSortAscending) => !prevSortAscending);
  };
  const handleInputChange = (ev, id) => {
    setEditedUserId(id);
    let newInitialData = JSON.parse(JSON.stringify(initialData));
    const updatedCard = newInitialData.find((Card) => Card._id === id);
    updatedCard.stock = ev.target.value;
    const newDataCard = newInitialData.map((Card) => {
      if (Card._id === id) {
        Card = updatedCard;
      }
      return Card;
    });
    setSortedData(newDataCard);
    setIntialCardData(updatedCard);
    setInitialData(newDataCard);
  };

  const handleSubmit = async (event, id) => {
    event.preventDefault();
    try {
      if (inputsErrorsState) {
        return;
      }
      const cardUpdate = JSON.parse(JSON.stringify(initialCardData));

      if (cardUpdate) {
        delete cardUpdate.likes;
        delete cardUpdate.zipCode;
        delete cardUpdate.image._id;
        delete cardUpdate._id;
        delete cardUpdate.__v;
        delete cardUpdate.user_id;
        delete cardUpdate.bizNumber;
        delete cardUpdate.createdAt;
      }
      await axios.put("/cards/" + id, cardUpdate);
      const sorted = [...initialData].sort((a, b) => {
        if (sortAscending) {
          return a.stock - b.stock;
        } else {
          return b.stock - a.stock;
        }
      });
      setSortedData(sorted);
      toast.success("changes has been saved");
      setButtonValid(false);
    } catch (err) {
      console.log(err);
      toast.error("cannot save the changes");
    }
  };
  return (
    <Box>
      <h1 style={{ fontFamily: "Pangolin" }}>Inventory Data</h1>
      <h3>
        you can change the display by clicking on the arrow, you can also update
        the stock amount
      </h3>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div style={{ overflowX: "auto" }}>
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
                      <TableCell align="center">
                        {" "}
                        <input
                          type="text"
                          value={row.stock}
                          description={"stock"}
                          onChange={(ev) => handleInputChange(ev, row._id)}
                        />
                        {row._id === editedUserId &&
                          inputsErrorsState &&
                          inputsErrorsState.stock && (
                            <Alert severity="warning">
                              <div>{inputsErrorsState.stock}</div>
                            </Alert>
                          )}
                      </TableCell>
                      <TableCell align="center">{row.category}</TableCell>
                      <TableCell align="center">{row.colors}</TableCell>
                      <TableCell align="center">{row.price}</TableCell>
                      <TableCell align="center">{row.user_id}</TableCell>
                      <TableCell align="center">
                        <Button
                          onClick={(ev) => handleSubmit(ev, row._id)}
                          disabled={row._id !== editedUserId || !buttonValid}
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
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};
export default InventoryManagement;

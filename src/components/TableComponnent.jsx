import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { Grid } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import "react-toastify/dist/ReactToastify.css";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Box from "@mui/material/Box";

const TableComponent = ({
  id,
  title,
  category,
  colors,
  idUser,
  img,
  price,
  stock,
  bizNumber,
  likes,
  onClick,
  onEdit,
  onDelete,
  onFavorites,
  canEdit,
  canUser,
  canDelete,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table" /* onClick={() => onClick(id)} */>
            <TableBody>
              <TableRow
                key={id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <CardMedia
                    component="img"
                    sx={{ height: 200, width: 200 }}
                    image={img}
                    title={title}
                    onClick={() => onClick(id)}
                  />
                </TableCell>
                <TableCell>
                  <strong style={{ fontSize: "1.5rem" }}>{title}</strong>
                  <br />
                  {"category: "}
                  {category}
                  <br />
                  {"colors: "}
                  {colors}
                  <br />
                  {bizNumber}
                  {"price:"} {price}
                  {"$"}
                  <br />
                </TableCell>

                <TableCell>
                  {stock <= 1 ? (
                    <Typography
                      variant="body2"
                      color="error"
                      fontWeight="bold"
                      fontSize="1.5rem"
                    >
                      Sold Out
                    </Typography>
                  ) : (
                    <Button variant="contained" color="primary">
                      Buy Now
                    </Button>
                  )}
                  <CardActions>
                    {canDelete || canEdit ? (
                      <Button size="small" onClick={() => onDelete(id)}>
                        <DeleteIcon />
                      </Button>
                    ) : (
                      ""
                    )}
                    {canEdit ? (
                      <Button
                        variant="text"
                        color="warning"
                        onClick={() => onEdit(id)}
                      >
                        Edit
                      </Button>
                    ) : (
                      ""
                    )}
                    <Box
                      sx={{
                        display: "flex",

                        alignItems: "flex-start",
                      }}
                    >
                      {canUser ? (
                        <Button size="small" onClick={() => onFavorites(id)}>
                          {likes.includes(idUser) ? (
                            <FavoriteIcon color="secondary" />
                          ) : (
                            <FavoriteBorderIcon color="secondary" />
                          )}
                        </Button>
                      ) : (
                        ""
                      )}
                    </Box>
                  </CardActions>
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

TableComponent.propTypes = {
  category: PropTypes.string,
  colors: PropTypes.string,
  idUser: PropTypes.string,
  price: PropTypes.number,
  stock: PropTypes.number,
  likes: PropTypes.array,
  onFavorites: PropTypes.func,
  canDelete: PropTypes.bool,
  id: PropTypes.string,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  onDelete: PropTypes.func,
  onClick: PropTypes.func,
  onEdit: PropTypes.func,
  canEdit: PropTypes.bool,
  bizNumber: PropTypes.number,
};

TableComponent.defaultProps = {
  img: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K",
  canEdit: false,
};

export default TableComponent;

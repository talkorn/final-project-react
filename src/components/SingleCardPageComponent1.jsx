import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { toast } from "react-toastify";
const SingleCardPageComponent = ({
  onFavorites,
  ids,
  title,
  subTitle,
  description,
  category,
  colors,
  img,
  stock,
  price,
  bizNumber,
  createdAt,
  onEdit,
  onDelete,
  idUser,
  likes,
  onClick,
  canEdit,
  canUser,
  canDelete,
  cardIdUser,
}) => {
  const { id } = useParams();
  const [cardNumber, setCardNumber] = useState(bizNumber);

  const handleInputChange = async () => {
    try {
      let users = await axios.get(`/cards/`);
      users = users.data;
      await axios.patch(`/cards/bizNumber/${id}`);
      const { data } = await axios.get(`/cards/${id}`);
      const newData = { ...data };

      const existingData = users.find(
        (item) => item.bizNumber === newData.bizNumber
      );

      if (existingData) {
        toast.error("the card number already exist");
        return;
      } else {
        setCardNumber(newData.bizNumber);
        toast.success("You've changed the card number");
      }
    } catch (err) {
      console.log("Error fetching updated card list", err);
    }
  };
  return (
    <Card sx={{ margin: "auto", maxWidth: 550 }}>
      <CardMedia
        component="img"
        sx={{ height: 180 }}
        image={img}
        title={title}
      />{" "}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>

        <Divider />
        <Typography variant="body2" color="text.secondary">
          {subTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {"description:"}
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {"Price: "} {price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {"Category: "} {category}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {"Color: "} {colors}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {"createdAte: "} {createdAt}
        </Typography>
        <Typography variant="body2" color="text.secondary"></Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          onClick={handleInputChange}
        ></Typography>
        {canDelete ? (
          <Tooltip title="Here you can change the card number">
            <Button
              sx={{
                color: "grey",
                textTransform: "none",
                fontWeight: "normal",
              }}
              size="small"
              onClick={handleInputChange}
            >
              {"Card Number: "}
              {cardNumber}
            </Button>
          </Tooltip>
        ) : (
          <Button
            sx={{
              color: "grey",
              textTransform: "none",
              fontWeight: "normal",
            }}
            size="small"
          >
            {"CardNumber: "}
            {cardNumber}
          </Button>
        )}
      </CardContent>
      <CardActions>
        {canDelete || (canEdit && cardIdUser === idUser) ? (
          <Button size="small" onClick={() => onDelete(id)}>
            <DeleteIcon />
          </Button>
        ) : (
          ""
        )}
        {canEdit && cardIdUser === idUser ? (
          <Button variant="text" color="warning" onClick={() => onEdit(id)}>
            Edit
          </Button>
        ) : (
          ""
        )}
        <Box
          sx={{ display: "flex", width: "100%", justifyContent: "flex-end" }}
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
    </Card>
  );
};
SingleCardPageComponent.propTypes = {
  id: PropTypes.string,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  canEdit: PropTypes.bool,

  bizNumber: PropTypes.number,
};

SingleCardPageComponent.defaultProps = {
  img: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K",
  subTitle: "",
  canEdit: false,
};
export default SingleCardPageComponent;

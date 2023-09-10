import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
/* import CallIcon from "@mui/icons-material/Call"; */
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import PropTypes from "prop-types";

const CardComponent = ({
  id,
  title,
  category,
  colors,
  idUser,
  img,
  price,
  stock,
  onClick,
  onEdit,
  onDelete,
  onFavorites,
  likes,
  canEdit,
  canUser,
  canDelete,
}) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        onClick={() => onClick(id)}
        component="img"
        sx={{ height: 200 }}
        image={img}
        title={title}
      />{" "}
      <CardContent onClick={() => onClick(id)}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Divider />

        <Typography variant="body2" color="text.secondary">
          {"Price: "} {price} {"$"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {"Category: "} {category}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {"Colors: "} {colors}
        </Typography>
      </CardContent>{" "}
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

CardComponent.propTypes = {
  category: PropTypes.string,
  colors: PropTypes.string,
  idUser: PropTypes.string,
  price: PropTypes.number,
  stock: PropTypes.number,
  onFavorites: PropTypes.func,
  likes: PropTypes.array,
  id: PropTypes.string,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  onClick: PropTypes.func,
  onEdit: PropTypes.func,
  canEdit: PropTypes.bool,
  bizNumber: PropTypes.number,
};

CardComponent.defaultProps = {
  img: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K",
  subTitle: "",
  canEdit: false,
};

export default CardComponent;

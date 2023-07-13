import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import ROUTES from "../routes/ROUTES";
import { Fragment } from "react";

const ShortTYpographyComponnent = () => {
  return (
    <Fragment>
      <Typography
        variant="h6"
        /*  noWrap */
        component={Link}
        to={ROUTES.HOME}
        sx={{
          mr: 1,
          fontFamily: "monospace",
          fontWeight: "bold",
          letterSpacing: ".1rem",
          color: "black",
          textDecoration: "none",
          fontSize: "1.5rem",
          "&:hover": {
            color: "grey",
          },
        }}
      >
        Home
      </Typography>
    </Fragment>
  );
};
export default ShortTYpographyComponnent;

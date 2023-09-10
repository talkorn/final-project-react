import { NavLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

const NavLinkComponent = ({ url, label, onClick }) => {
  return (
    <NavLink to={url} onClick={onClick} style={{ textDecoration: "none" }}>
      {({ isActive }) => (
        <Typography
          sx={{
            my: 2,
            display: "block",
            p: 2,
            fontFamily: "monospace",
            fontSize: "1.2rem",
            "@media (max-width: 1040px) and (min-width: 800px)": {
              fontSize: "0.88rem",
            },
          }}
          color={isActive ? "grey" : "black"}
        >
          {label}
        </Typography>
      )}
    </NavLink>
  );
};

NavLinkComponent.propTypes = {
  url: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default NavLinkComponent;

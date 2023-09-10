import React from "react";
import NavLinkComponent from "./Navbar/NavLinkComponent";
import ROUTES from "../routes/ROUTES";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import PropTypes from "prop-types";
const NavBarInventory = ({ handleCloseNavMenu }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    handleCloseNavMenu();
  };

  return (
    <div>
      <Button
        aria-controls={open ? "basic-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          color: "black",
          textTransform: "none",
          textAlign: "left",
          fontFamily: "monospace",
          my: 2,
          display: "block",
          p: 2,
          fontSize: "1.2rem",
          "@media (max-width: 1040px) and (min-width: 800px)": {
            fontSize: "0.88rem",
          },
        }}
      >
        Management
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <NavLinkComponent
          key={ROUTES.INVENTORY}
          url={ROUTES.INVENTORY}
          label="INVENTORY"
          onClick={handleClose}
        />
        <NavLinkComponent
          key={ROUTES.FAVMANG}
          url={ROUTES.FAVMANG}
          label="FAVMANG"
          onClick={handleClose}
        />
        <NavLinkComponent
          key={ROUTES.CRM}
          url={ROUTES.CRM}
          label="CRM"
          onClick={handleClose}
        />
      </Menu>
    </div>
  );
};
NavBarInventory.Prototype = {
  handleCloseNavMenu: PropTypes.func,
};
export default NavBarInventory;

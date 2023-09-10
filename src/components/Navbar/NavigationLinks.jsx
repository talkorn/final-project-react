import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import NavLinkComponent from "./NavLinkComponent";
import { Link } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import NavBarInventory from "../MangementNavBar";
import PropTypes from "prop-types";

function NavMenu({
  anchorElNav,
  handleCloseNavMenu,
  isLoggedIn,
  handleChangeCategory,
  logoutClick,
  payload,
  authedPages,
  notAuthPages,
}) {
  return (
    <Menu
      id="menu-appbar"
      anchorEl={anchorElNav}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={Boolean(anchorElNav)}
      onClose={handleCloseNavMenu}
    >
      <NavLinkComponent
        key={ROUTES.ABOUT}
        url={ROUTES.ABOUT}
        label="About"
        onClick={handleCloseNavMenu}
      />
      <NavLinkComponent
        key={"necklaces"}
        url={ROUTES.CATEGORY}
        label="Necklaces"
        onClick={() => handleChangeCategory("necklaces")}
      />
      <NavLinkComponent
        key={"earrings"}
        url={ROUTES.CATEGORY}
        label="Earrings"
        onClick={() => handleChangeCategory("earrings")}
      />
      <NavLinkComponent
        key={"bracelets"}
        url={ROUTES.CATEGORY}
        label="Bracelets"
        onClick={() => handleChangeCategory("bracelets")}
      />
      {isLoggedIn && (
        <NavLinkComponent
          key={ROUTES.FAVCARDS}
          url={ROUTES.FAVCARDS}
          label="Favorite"
          onClick={handleCloseNavMenu}
        />
      )}
      {payload && payload.isBusiness ? (
        <NavLinkComponent url={ROUTES.MYCARDS} label="MY Cards" />
      ) : (
        payload &&
        payload.isAdmin && (
          <NavLinkComponent url={ROUTES.MYCARDS} label="MY Cards" />
        )
      )}
      {payload && payload.isAdmin && (
        <NavBarInventory handleCloseNavMenu={handleCloseNavMenu} />
      )}
      {isLoggedIn
        ? authedPages.map((settings) =>
            settings.url === ROUTES.LOGOUT ? (
              <MenuItem key={settings.url}>
                <Link
                  to={settings.url}
                  onClick={logoutClick}
                  style={{ textDecoration: "none" }}
                >
                  <Typography sx={{ textDecoration: "none", color: "black" }}>
                    {settings.label}
                  </Typography>
                </Link>
              </MenuItem>
            ) : (
              <MenuItem key={settings.url}>
                <Link
                  to={settings.url}
                  onClick={handleCloseNavMenu}
                  style={{ textDecoration: "none" }}
                >
                  <Typography sx={{ textDecoration: "none", color: "black" }}>
                    {settings.label}
                  </Typography>
                </Link>
              </MenuItem>
            )
          )
        : notAuthPages.map((page) => (
            <NavLinkComponent
              onClick={handleCloseNavMenu}
              key={page.url}
              {...page}
            />
          ))}
    </Menu>
  );
}
NavMenu.propTypes = {
  anchorElNav: PropTypes.func,
  handleCloseNavMenu: PropTypes.func,
  handleChangeCategory: PropTypes.func,
  logoutClick: PropTypes.func,
  payload: PropTypes.object,
  authedPages: PropTypes.array,
};
export default NavMenu;

import React from "react";
import { IconButton, Avatar, Menu, MenuItem } from "@mui/material";
import ROUTES from "../../routes/ROUTES";
import NavLinkComponent from "./NavLinkComponent";
import PropTypes from "prop-types";

const UserAvatar = ({
  userPicture,
  anchorElAvatar,
  handleOpenAvatarMenu,
  handleCloseAvatarMenu,
  logoutClick,
  authedPages,
}) => {
  return (
    <div>
      <IconButton sx={{ p: 0 }} onClick={handleOpenAvatarMenu}>
        <Avatar
          alt={userPicture ? userPicture.alt : "Remy Sharp"}
          src={
            userPicture
              ? userPicture.url
              : "https://img.freepik.com/premium-vector/blue-green-circle-with-person-icon-it_816425-2573.jpg?w=826"
          }
        />
      </IconButton>
      <Menu
        id="menu-avatar"
        anchorEl={anchorElAvatar}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElAvatar)}
        onClose={handleCloseAvatarMenu}
      >
        <div>
          {authedPages.map((page) =>
            page.url === ROUTES.LOGOUT ? (
              <MenuItem
                key={page.url}
                onClick={() => {
                  handleCloseAvatarMenu();
                  logoutClick();
                }}
              >
                {page.label}
              </MenuItem>
            ) : (
              <NavLinkComponent
                key={page.url}
                {...page}
                onClick={handleCloseAvatarMenu}
              />
            )
          )}
        </div>
      </Menu>
    </div>
  );
};
UserAvatar.propTypes = {
  userPicture: PropTypes.object,
  anchorElAvatar: PropTypes.object,
  handleOpenAvatarMenu: PropTypes.func,
  handleCloseAvatarMenu: PropTypes.func,
  logoutClick: PropTypes.func,
  authedPages: PropTypes.array,
};

export default UserAvatar;

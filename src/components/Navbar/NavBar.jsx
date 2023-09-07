import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import ROUTES from "../../routes/ROUTES";
import NavLinkComponent from "./NavLinkComponent";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SearchFromNav from "../SearchNavComponent1";
import { authActions } from "../../store/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShortTYpographyComponnent from "../ShortTYpographyComponnent";
import CheckboxComponnent from "../CheckboxComponnent";
import { categoryActions } from "../../store/category";
import NavBarInventory from "../MangementNavBar";
import { useState, useEffect } from "react";
import axios from "axios";
const notAuthPages = [
  { label: "SignUp", url: ROUTES.SIGNUP },
  { label: "Login", url: ROUTES.LOGIN },
];
const authedPages = [
  { label: "Profile", url: ROUTES.PROFILE },
  { label: "Logout", url: ROUTES.LOGOUT },
];
function ResponsiveAppBar() {
  const [anchorElAvatar, setAnchorElAvatar] = useState(null);
  const payload = useSelector((store) => store.authSlice.payload);
  const isLoggedIn = useSelector(
    (bigPieBigState) => bigPieBigState.authSlice.isLoggedIn
  );
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [userPicture, setUserPicture] = useState(null);
  const dispatch = useDispatch();
  /*  const currentCategory = useSelector(
    (state) => state.categorySlice.theCategory
  ); */
  useEffect(() => {
    (async () => {
      try {
        let id;
        if (payload) {
          id = payload._id;
        } else {
          return;
        }
        const { data } = await axios.get(`users/${id}`);
        let newInputState = {
          ...data,
        };
        setUserPicture(newInputState.image);
        console.log("newInputState", newInputState);
      } catch (err) {
        console.log("error from axios", err.response.data);
      }
    })();
  }, [payload]);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleOpenAvatarMenu = (event) => {
    setAnchorElAvatar(event.currentTarget);
  };

  const handleCloseAvatarMenu = () => {
    setAnchorElAvatar(null);
  };

  const logoutClick = () => {
    localStorage.clear();
    dispatch(authActions.logout());
    handleCloseNavMenu();
    toast.success("You've been signed out");
  };
  const handleChangeCategory = (newCategory) => {
    dispatch(categoryActions.changeMode({ theCategory: newCategory }));
    handleCloseNavMenu();
  };
  return (
    <AppBar position="static" sx={{ backgroundColor: "white" }}>
      <Container maxWidth="xl" sx={{ marginTop: 0 }}>
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <CheckboxComponnent style={{ color: "black" }} />{" "}
          <ShortTYpographyComponnent sx={{ margin: "0" }} />
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon style={{ color: "black" }} />
            </IconButton>
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
              sx={{
                display: { xs: "block", md: "none" },
              }}
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

              {payload && payload.isBusiness && (
                <NavLinkComponent
                  key={ROUTES.MYCARDS}
                  url={ROUTES.MYCARDS}
                  label="MY Cards"
                  onClick={handleCloseNavMenu}
                />
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
                          <Typography
                            sx={{ textDecoration: "none", color: "black" }}
                          >
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
                          <Typography
                            sx={{ textDecoration: "none", color: "black" }}
                          >
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
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <NavLinkComponent url={ROUTES.ABOUT} label="About" />
            <NavLinkComponent
              url={ROUTES.CATEGORY}
              label="Necklaces"
              onClick={() => handleChangeCategory("necklaces")}
            />
            <NavLinkComponent
              url={ROUTES.CATEGORY}
              label="Earrings"
              onClick={() => handleChangeCategory("earrings")}
            />
            <NavLinkComponent
              url={ROUTES.CATEGORY}
              label="Bracelets"
              onClick={() => handleChangeCategory("bracelets")}
            />
            {isLoggedIn && (
              <NavLinkComponent url={ROUTES.FAVCARDS} label="Favorite" />
            )}
            {payload && payload.isBusiness && (
              <NavLinkComponent url={ROUTES.MYCARDS} label="MY Cards" />
            )}

            {payload && payload.isAdmin && (
              <NavBarInventory handleCloseNavMenu={handleCloseNavMenu} />
            )}
          </Box>
          {/*  <Box sx={{ flexGrow: 0 }}>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {isLoggedIn
                ? authedPages.map((page) =>
                    page.url === ROUTES.LOGOUT ? (
                      <NavLinkComponent
                        key={page.url}
                        {...page}
                        to={page.url}
                        onClick={logoutClick}
                      />
                    ) : (
                      <NavLinkComponent key={page.url} {...page} />
                    )
                  )
                : notAuthPages.map((page) => (
                    <NavLinkComponent key={page.url} {...page} />
                  ))}

              <IconButton sx={{ p: 0 }} onClick={handleOpenAvatarMenu}>
                <Avatar
                  alt="Remy Sharp"
                  src="https://img.freepik.com/premium-vector/blue-green-circle-with-person-icon-it_816425-2573.jpg?w=826"
                />
              </IconButton>
            </Box>
          </Box>
        </Toolbar> */}
          <SearchFromNav />
          <Box sx={{ flexGrow: 0 }}>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {isLoggedIn ? (
                <>
                  {/* Avatar icon with associated menu */}
                  <IconButton
                    sx={{ p: 0 }}
                    onClick={handleOpenAvatarMenu} // Open avatar menu on click
                  >
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
                    {/* Profile and Logout items */}
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
                </>
              ) : (
                notAuthPages.map((page) => (
                  <NavLinkComponent key={page.url} {...page} />
                ))
              )}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;

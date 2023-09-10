import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import AdbIcon from "@mui/icons-material/Adb";
import ROUTES from "../../routes/ROUTES";
import NavLinkComponent from "./NavLinkComponent";
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
import UserAvatar from "./NavAvatar";
import NavMenu from "./NavigationLinks";
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
            <NavMenu
              anchorElNav={anchorElNav}
              handleCloseNavMenu={handleCloseNavMenu}
              isLoggedIn={isLoggedIn}
              handleChangeCategory={handleChangeCategory}
              logoutClick={logoutClick}
              payload={payload}
              authedPages={authedPages}
              notAuthPages={notAuthPages}
            />
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
          </Box>
          <SearchFromNav />
          <Box sx={{ flexGrow: 0 }}>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {isLoggedIn ? (
                <>
                  <UserAvatar
                    isLoggedIn={isLoggedIn}
                    userPicture={userPicture}
                    anchorElAvatar={anchorElAvatar}
                    handleOpenAvatarMenu={handleOpenAvatarMenu}
                    handleCloseAvatarMenu={handleCloseAvatarMenu}
                    logoutClick={logoutClick}
                    authedPages={authedPages}
                    notAuthPages={notAuthPages}
                  />
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

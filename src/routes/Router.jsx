import { Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import ROUTES from "./ROUTES";
import HomePage from "../pages/HomePage";
import SignUpPage from "../pages/SignUpPage";
import LogInPage from "../pages/LogIn";
import CardPage from "../pages/Card";
import EditPage from "../pages/EditPage";
import FavoritePage from "../pages/Favorite";
import AddCardPage from "../pages/AddCard";
import MyCardsPage from "../pages/MyCards";
import SuperProtectedRoute from "../components/SuperProtectedRoute";
import ProfilePage from "../pages/ProfilePage";
import CrmTable from "../pages/CrmPage";
import UserPage from "../pages/UserPage";
import AboutPage from "../pages/AboutPage";
import ProtectedRoute from "../components/ProtectedRoute";
import ContactPage from "../pages/ContactPage";
import CategoryPage from "../pages/CategoryPage";
import FavoriteManagement from "../pages/FavoriteManagement";
import InventoryManagement from "../pages/inventoryManagement";
import ResetPasswordForm from "../pages/ResetPasswordPage";
const Router = () => {
  return (
    <Container maxWidth="xl">
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.ABOUT} element={<AboutPage />} />
        <Route path={ROUTES.CATEGORY} element={<CategoryPage />} />
        <Route path={ROUTES.SIGNUP} element={<SignUpPage />} />
        <Route path={ROUTES.PASSWORDCHANGE} element={<ResetPasswordForm />} />
        <Route path="/card/:id" element={<CardPage />} />
        <Route
          path={ROUTES.FAVCARDS}
          element={<ProtectedRoute element={<FavoritePage />} />}
        />
        <Route path={ROUTES.LOGIN} element={<LogInPage />} />
        <Route path={ROUTES.CONTACT} element={<ContactPage />} />
        <Route path={ROUTES.LOGOUT} element={<HomePage />} />
        <Route
          path={ROUTES.PROFILE}
          element={<ProtectedRoute element={<ProfilePage />} />}
        />
        <Route
          path="/edit/:id"
          element={
            <SuperProtectedRoute
              isAdmin={true}
              isBiz={false}
              element={<EditPage />}
            />
          }
        />
        <Route
          path={ROUTES.ADDCARD}
          element={
            <SuperProtectedRoute
              isAdmin={true}
              isBiz={true}
              element={<AddCardPage />}
            />
          }
        />
        <Route
          path={ROUTES.MYCARDS}
          element={
            <SuperProtectedRoute
              isAdmin={true}
              isBiz={true}
              element={<MyCardsPage />}
            />
          }
        />
        <Route
          path="/user/:id"
          element={
            <SuperProtectedRoute
              isAdmin={true}
              isBiz={false}
              element={<UserPage />}
            />
          }
        />
        <Route
          path={ROUTES.CRM}
          element={
            <SuperProtectedRoute
              isAdmin={true}
              isBiz={false}
              element={<CrmTable />}
            />
          }
        />
        <Route
          path={ROUTES.FAVMANG}
          element={
            <SuperProtectedRoute
              isAdmin={true}
              isBiz={false}
              element={<FavoriteManagement />}
            />
          }
        />
        <Route
          path={ROUTES.INVENTORY}
          element={
            <SuperProtectedRoute
              isAdmin={true}
              isBiz={false}
              element={<InventoryManagement />}
            />
          }
        />
        <Route
          path={ROUTES.PROFILE}
          element={<ProtectedRoute element={<ProfilePage />} />}
        />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </Container>
  );
};
export default Router;

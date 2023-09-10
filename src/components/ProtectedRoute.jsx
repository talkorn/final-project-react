import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import ROUTES from "../routes/ROUTES";

const ProtectedRoute = ({ element }) => {
  const isLoggedIn = useSelector((bigState) => bigState.authSlice.isLoggedIn);

  if (isLoggedIn) {
    return element;
  } else {
    return <Navigate to={ROUTES.LOGIN} />;
  }
};
ProtectedRoute.propTypes = {
  element: PropTypes.object,
};

export default ProtectedRoute;

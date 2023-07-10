import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import jwt_decode from "jwt-decode";
import axios from "axios";
const useLoggedIn = () => {
  const dispatch = useDispatch();
  return async () => {
    try {
      const token = localStorage.getItem("token");
      const payload = jwt_decode(token);
      const id = payload._id;
      if (!token) {
        return;
      }
      await axios.get(`/users/${id}`);

      dispatch(authActions.login(payload));
    } catch (err) {
      //server error
      //invalid token
    }
  };
};
export default useLoggedIn;

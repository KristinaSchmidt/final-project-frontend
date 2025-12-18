import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectUser,
} from "../../../store/auth/authSelectors";

const PrivateRoute = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  if (!isLoggedIn || !user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
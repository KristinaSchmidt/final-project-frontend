import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectToken } from "../../../store/auth/authSelectors";

const PrivateRoute = () => {
  const isToken = useSelector(selectToken);
  // const user = useSelector(selectUser);

  // Token existiert, aber der User ist noch nicht geladen
  if (!isToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
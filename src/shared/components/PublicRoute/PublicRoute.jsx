import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectToken, selectUser, selectIsLoggedIn } from "../../../store/auth/authSelectors";

const PublicRoute = () => {
  const isToken = useSelector(selectToken);
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isToken && !user) {
    return <p>Loading...</p>;
  }
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectToken, selectUser } from "../../../store/auth/authSelectors";

const PublicRoute = () => {
  const isToken = useSelector(selectToken);
  const user = useSelector(selectUser);

  // Token existiert, aber der User ist noch nicht geladen
  if (isToken && !user) {
    return <p>Loading...</p>;
  }

  // Wenn User bereits existiert → redirect (z. B. Home)
  if (user) {
    return <Navigate to="/" replace />;
  }

  // Wenn kein User vorhanden → öffentlichen Inhalt anzeigen
  return <Outlet />;
};

export default PublicRoute;
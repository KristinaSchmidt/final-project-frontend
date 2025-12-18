import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./styles/style.css";
import Navigation from "./pages/Navigation.jsx";
import { getCurrentUser } from "./store/auth/authOperation.js";
import { selectToken } from "./store/auth/authSelectors.js";
import { setToken } from "./shared/api/auth-api.js";


function App() {
   const token = useSelector(selectToken);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      setToken(token);
      dispatch(getCurrentUser());
    }
  }, [token, dispatch]);

  return (
    <>
      <Navigation />
    </>
  );
}

export default App;
  
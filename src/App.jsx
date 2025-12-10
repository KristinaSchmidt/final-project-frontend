import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./styles/style.css";
import Navigation from "./pages/Navigation.jsx";
import { getCurrentUser } from "./store/auth/authOperation.js";
import { selectToken } from "./store/auth/authSelectors.js";
import { setToken } from "./shared/api/auth-api.js";


function App() {
   const token = useSelector(selectToken);   // <-- nicht isLoggedIn, sondern token selbst
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      setToken(token);            // <-- TOKEN IN AXIOS SETZEN!
      dispatch(getCurrentUser()); // <-- jetzt erst Request möglich
    }
  }, [token, dispatch]);

  return (
    <>
      <Navigation />
    </>
  );
}

export default App;
  
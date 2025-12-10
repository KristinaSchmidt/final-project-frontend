import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../shared/components/AuthLayout/AuthLayout.jsx";
import LoginForm from "../../modules/Login/LoginForm/LoginForm.jsx";
import instagramPhone from "../.././assets/images/instagramPhone.svg";
import styles from "./LoginPage.module.css";
import AuthFooter from "../../shared/components/AuthFooter/AuthFooter.jsx";
import { loginUser } from "../../store/auth/authOperation";
import { selectAuthRequest } from "../../store/auth/authSelectors";


const LoginPage=() =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, isLoggedIn } = useSelector(selectAuthRequest);

    useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  let requestErrors = null;
  let globalError = null;

  if (typeof error === "object" && error !== null) {
    requestErrors = error;
  } else if (typeof error === "string") {
    globalError = error;
  }

  const handleLogin = (values) => {
    dispatch(loginUser(values));
  };



    return (
        <div className={styles.container}>
            <img src={instagramPhone} alt="InstagramImage"></img>
            <div className={styles.right}>
                <AuthLayout>
                    <LoginForm 
                        submitForm={handleLogin}
                        requestErrors={requestErrors}
                        isSubmitSuccess={isLoggedIn}
                    />
                {loading && <p>Login request...</p>}
                {globalError && (
                <p className={styles.errorText}>{globalError}</p>
                )}

                </AuthLayout>

                <AuthFooter
                    text="Don’t have an account?"
                    linkText="Sign up"
                    to="/register"
                />
            </div>
        </div>
    )
};
export default LoginPage;
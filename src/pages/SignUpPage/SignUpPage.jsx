import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/auth/authOperation";
import { selectAuthRequest } from "../../store/auth/authSelectors";
import { Navigate } from "react-router-dom";// 
import styles from "./SignUpPage.module.css";
import AuthLayout from "../../shared/components/AuthLayout/AuthLayout";
import AuthFooter from "../../shared/components/AuthFooter/AuthFooter";
import SignUpForm from "../../modules/SignUpForm/SignUpForm";




const SignUpPage=() => {
  const dispatch = useDispatch();
    const { error, loading, isRegisterSuccess } = useSelector(selectAuthRequest);
    const noRegister = async (payload) => {
    dispatch(registerUser(payload));
};

  let requestErrors = null;
let globalError = null;

if (typeof error === "object" && error !== null) {
  if ("message" in error && !("email" in error)) {
    requestErrors = { email: error.message };
  } else {
    requestErrors = error;
  }
} else if (typeof error === "string") {
  globalError = error;
}

if (isRegisterSuccess) return <Navigate to="/login" />;

    return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <AuthLayout>
                <SignUpForm submitForm={noRegister} isSubmitSuccess={isRegisterSuccess} requestErrors={requestErrors}/>

                {loading && <p>Register request...</p>}
                {globalError && (
                <p className={styles.errorText}>{globalError}</p>
              )}
            </AuthLayout>

            <AuthFooter text="Have an account?" linkText="Log in" to="/login" />
        </div>
    </div>
  );
}

export default SignUpPage;

import AuthLayout from "../../shared/components/AuthLayout/AuthLayout.jsx";
import LoginForm from "../../modules/Login/LoginForm/LoginForm.jsx";
import instagramPhone from "../.././assets/images/instagramPhone.svg";
import styles from "./LoginPage.module.css";
import AuthFooter from "../../shared/components/AuthFooter/AuthFooter.jsx";


const LoginPage=() =>{
    return (
        <div className={styles.container}>
            <img src={instagramPhone} alt="InstagramImage"></img>
            <div className={styles.right}>
                <AuthLayout>
                    <LoginForm />
                
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
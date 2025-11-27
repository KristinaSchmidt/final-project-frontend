import styles from "./SignUpPage.module.css";
import AuthLayout from "../../shared/components/AuthLayout/AuthLayout";
import AuthFooter from "../../shared/components/AuthFooter/AuthFooter";
import SignUpForm from "../../modules/SignUpForm/SignUpForm";

function SignUpPage() {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <AuthLayout>
                    <SignUpForm />
                </AuthLayout>

                <AuthFooter
                    text="Have an account?"
                    linkText="Log in"
                    to="/login"
                />
            </div>
        </div>
    )
}
export default SignUpPage;
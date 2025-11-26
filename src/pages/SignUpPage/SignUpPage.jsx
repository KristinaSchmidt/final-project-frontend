import styles from "./SignUpPage.module.css"

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
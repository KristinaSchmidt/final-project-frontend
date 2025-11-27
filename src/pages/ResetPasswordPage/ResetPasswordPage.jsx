import { Link } from "react-router-dom";
import styles from "./ResetPasswordPage.module.css";
import AuthLayout from "../../shared/components/AuthLayout/AuthLayout";
import ResetPasswordForm from "../../modules/ResetPasswordForm/ResetPasswordForm";



function ResetPasswordPage() {
  return (
    <div className={styles.container}>
        
      <div className={styles.wrapper}>
        <AuthLayout>
          <ResetPasswordForm />
        </AuthLayout>

        <div className={styles.backBox}>
          <Link to="/login" className={styles.backLink}>
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
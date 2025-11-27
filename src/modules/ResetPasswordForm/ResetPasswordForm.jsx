import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Input from "../../shared/components/Input/Input";
import Button from "../../shared/components/Button/Button";
import styles from "./ResetPasswordForm.module.css";
import trouble from "../../assets/icons/trouble.png";

const ResetPasswordForm= () => {
    const {register, handleSubmit, formState:{errors}} = useForm();

    const onSubmit= (values) => {
        console.log("Reset password data:", values)
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <img src={trouble} alt="Trouble icon" className={styles.icon} />
            <h2 className={styles.title}>Trouble logging in?</h2>
            <p className={styles.text}>
                Enter your email, phone, or username and we'll
                send you a link to get back into your account.
             </p>

            <Input
                name="identifier"
                type="text"
                placeholder="Email or Username"
                register={register}
                error={errors.identifier?.message}
            />

            <Button type="submit">Reset your password</Button>

            <div className={styles.divider}>
                <span></span>
                <p>OR</p>
                <span></span>
            </div>

            <Link to="/register" className={styles.createLink}>
                Create new account
            </Link>
        </form>
    );
};

export default ResetPasswordForm;
 
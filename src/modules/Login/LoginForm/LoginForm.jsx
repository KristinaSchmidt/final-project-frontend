import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "../../../shared/validation/authSchema.js";
import Input from "../../../shared/components/Input/Input.jsx";
import Button from "../../../shared/components/Button/Button.jsx";
import Logo from "../../../shared/components/Logo/Logo.jsx";
import styles from "./LoginForm.module.css"

const LoginForm= ({ submitForm, requestErrors, isSubmitSuccess }) => {
    const {register, handleSubmit, reset, setError, formState:{errors, isSubmitting}} = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });
    const navigate = useNavigate(); 

    useEffect(() => {
    if (requestErrors) {
      for (const key in requestErrors) {
        setError(key, {
          message: requestErrors[key],
        });
      }
    }
  }, [requestErrors, setError]);


  useEffect(() => {
    if (isSubmitSuccess) {
      reset();
    }
  }, [isSubmitSuccess, reset]);

  const onSubmit = (values) => {
    submitForm(values);
  };

  const handleForgotPassword = () => {
    navigate("/reset");
  };



    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Logo />
            <Input
                name="email"
                type="email"
                placeholder="Username or email"
                register={register}
                error={errors.email?.message}
            />
            <Input
                name="password"
                type="password"
                placeholder="Password"
                register={register}
                error={errors.password?.message}
            />
             <Button type="submit" disabled={isSubmitting}>Log in</Button>


            <div className={styles.divider}>
                <span></span>
                <p>OR</p>
                <span></span>
            </div>

            <button type="button" className={styles.forgot} onClick={handleForgotPassword}>Forgot password?</button>

        </form>
    )
};

export default LoginForm;
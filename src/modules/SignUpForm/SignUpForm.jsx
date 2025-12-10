import { useEffect } from "react";
import {useForm} from "react-hook-form";
import { Link } from "react-router-dom"; 
// import { zodResolver } from "@hookform/resolvers/zod";
// import { registerSchema } from "../../shared/validation/authSchema.js";
import Input from "../../shared/components/Input/Input.jsx";
import Button from "../../shared/components/Button/Button.jsx";
import Logo from "../../shared/components/Logo/Logo.jsx";
import styles from "./SignUpForm.module.css"

const SignUpForm = ({ requestErrors, isSubmitSuccess, submitForm }) => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

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

  // console.log(errors);


    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <Logo />

            <p className={styles.subtitle}>
            Sign up to see photos and videos <br /> 
            from your friends.
            </p>

            <Input
                name="email"
                type="email"
                placeholder="Email"
                register={register}
                error={errors.email?.message}
            />

            <Input
                name="fullname"
                type="text"
                placeholder="Full Name"
                register={register}
                error={errors.fullname?.message}
            />

            <Input
                name="username"
                type="text"
                placeholder="Username"
                register={register}
                error={errors.username?.message}
            />

            <Input
                name="password"
                type="password"
                placeholder="Password"
                register={register}
                error={errors.password?.message}
            />

            <div className={styles.textBlock}>
                <p>
                People who use our service may have uploaded your contact information
                to Instagram.{" "}
                    <Link to="/learnmore" className={styles.more}>Learn More</Link></p>
            </div>

            <div className={styles.textBlock}>
                <p>By signing up, you agree to our{" "}
                    <Link to="/terms" className={styles.more}>Terms</Link>
                ,{" "}
                <Link to="/privacypolicy" className={styles.more}>Privacy Policy</Link>{" "}
                and{" "}
                <Link to="/cookies" className={styles.more}>Cookies Policy</Link>
                .
                </p>
            </div>
            <Button type="submit" disabled={isSubmitting}>Sign up</Button>


          

        </form>
    )
};

export default SignUpForm;
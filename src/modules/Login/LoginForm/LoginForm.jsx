import {useForm} from "react-hook-form";
import Input from "../../../shared/components/Input/Input.jsx";
import Button from "../../../shared/components/Button/Button.jsx";
import Logo from "../../../shared/components/Logo/Logo.jsx";

const LoginForm= () => {
    const {register, handleSubmit, reset, formState:{errors}} = useForm();

    const onSubmit= values => {
        console.log(values);
    }
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
            <Button type="submit">Log in</Button>
        </form>
    )
};

export default LoginForm;
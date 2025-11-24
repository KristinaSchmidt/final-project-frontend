import styles from "./Button.module.css"

const Button = ({children, type="button", variant, ...props}) => {
    return (
        <button type={type} {...props} className={styles.btn}>{children}</button>
    );
};

export default Button;
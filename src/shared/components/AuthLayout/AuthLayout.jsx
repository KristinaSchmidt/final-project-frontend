import styles from "./AuthLayout.module.css";

const AuthLayout = ({title, children}) => {
    return(
        <div className={styles.container}>
            {title && <h2 className={styles.title}>{title}</h2>} {children}
        </div>
    )
};

export default AuthLayout;
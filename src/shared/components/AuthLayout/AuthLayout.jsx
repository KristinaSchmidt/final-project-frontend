import styles from "./AuthLayout.module.css";

const AuthLayout = ({title, children}) => {
    return(
        <div className={styles.container}>
            <div className={styles.box}>
                {title && <h2 className={styles.title}>{title}</h2>} {children}
            </div>
        </div>
    )
};

export default AuthLayout;
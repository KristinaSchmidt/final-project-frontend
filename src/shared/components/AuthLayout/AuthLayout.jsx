import styles from "./AuthLayout.module.css";

const AuthLayout = ({title, children, footer}) => {
    return(
        <div className={styles.container}>
            <div className={styles.box}>
                {title && <h2 className={styles.title}>{title}</h2>} {children}
            </div>
            {footer && <div className={styles.footer}>{footer}</div>}
        </div>
    )
};

export default AuthLayout;
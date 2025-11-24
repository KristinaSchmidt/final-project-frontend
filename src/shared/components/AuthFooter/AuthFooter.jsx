import styles from "./AuthFooter.module.css";
import { Link } from "react-router-dom"


const AuthFooter= ({text, linkText, to}) => {
    return (
        <div className={styles.authLinkDiv}>
            <p>{text}<Link to={to}>{linkText}</Link></p>
        </div>
    )
};

export default AuthFooter;
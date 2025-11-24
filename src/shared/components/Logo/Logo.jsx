import styles from "./Logo.module.css";
import logo from "../../../assets/images/logo.svg"


const Logo =() => {
    return (
        <div className={styles.logo}>
            <img src={logo} alt="ICHGRAM"></img>
        </div>
    )
};

export default Logo;
import styles from "./Logo.module.css";
import logo from "../../../assets/images/ICHGRAM.png"


const Logo =() => {
    return (
        <div className={styles.logoWrapper}>
            <img src={logo} alt="ICHGRAM" className={styles.logo} ></img>
        </div>
    )
};

export default Logo;
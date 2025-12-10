import styles from "./Logo.module.css";
import logo from "../../../assets/images/ICHGRAM.png"


const Logo =({variant= "auth"}) => {
    const wrapperClass= variant=== "sidebar"
 ? styles.sidebarLogoWrapper : styles.logoWrapper;

 const logoClass= variant === "sidebar" ? styles.sidebarLogo : styles.logo;


 return (
        <div className={wrapperClass}>
            <img src={logo} alt="ICHGRAM" className={logoClass} />
        </div>
    )
};

export default Logo;
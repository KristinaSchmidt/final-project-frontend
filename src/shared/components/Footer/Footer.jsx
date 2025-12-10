import styles from "./Footer.module.css";
import {Link} from "react-router-dom";
import { navItems } from "../../navigation/navItems";

const Footer=() => {
    const footerLinks = navItems.filter(item => item.showInFooter);
    return(
        <footer className={styles.footer}>
            <div className={styles.footerLinks}>
            {footerLinks.map(item =>(
                <Link
                    key={item.id}
                    to={item.path}
                    className={styles.footerLink}
                >
                    {item.label}
                </Link>
            ))}
            </div>
            <p className={styles.copy}>© 2025 ICHgram</p>

        </footer>
    )
};
export default Footer;
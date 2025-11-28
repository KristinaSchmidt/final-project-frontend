import styles from "./Sidebar.module.css"
import { navItems } from "../../navigation/navItems";
import Logo from "../Logo/Logo";
import { NavLink } from "react-router-dom";

const Sidebar=() => {
    const sidebarLinks = navItems.filter(item => item.showInSidebar);

    return (
        <div>
            <Logo />
            <nav className={styles.nav}>
                {sidebarLinks.map((item) => (
            <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
                isActive
                ? `${styles.navItem} ${styles.navItemActive}`
                : styles.navItem
            }
            >
            <img
              src={item.icon}
              alt={`${item.label} icon`}
              className={styles.navIcon}
            />

            <span className={styles.navLabel}>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
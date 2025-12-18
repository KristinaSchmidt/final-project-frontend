import styles from "./Sidebar.module.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/auth/authSelectors.js";
import { navItems } from "../../navigation/navItems";
import Logo from "../Logo/Logo";
import { NavLink } from "react-router-dom";
import Avatar from "../Avatar/Avatar.jsx";



const Sidebar = () => {
  const user = useSelector(selectUser);
  const sidebarLinks = navItems.filter((item) => item.showInSidebar);


  const avatarFromUser = user?.profile?.avatar || user?.avatar || "";

  return (
    <div>
      <Logo variant="sidebar" />

      <nav className={styles.nav}>
        {sidebarLinks.map((item) => {
          const isProfile = item.id === "profile";

          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? `${styles.navItem} ${styles.navItemActive}`
                  : styles.navItem
              }
            >
              {isProfile ? (
            <Avatar src={avatarFromUser} alt="Profile avatar" size="md" />
            ) : (
            <img src={item.icon} alt={`${item.label} icon`} className={styles.navIcon} />
            )}

              <span className={styles.navLabel}>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
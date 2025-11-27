import styles from "./Sidebar.module.css";
import { navItems } from "../../navigation/navItems";
import Logo from "../Logo/Logo";

const Sidebar=() => {
    const sidebarLinks = navItems.filter(item => item.showInSidebar);

    return (
        <div>
           <Logo />
           <nav>
            {sidebarLinks.map(item => ())}
           </nav>
        </div>
    )
}

export default Sidebar;
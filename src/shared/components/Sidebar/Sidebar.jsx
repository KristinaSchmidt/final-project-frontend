
import { navItems } from "../../navigation/navItems";
import Logo from "../Logo/Logo";

const Sidebar=() => {
    const sidebarLinks = navItems.filter(item => item.showInSidebar);

    return (
        <div>
           <Logo />
           <nav>
        
           </nav>
        </div>
    )
}

export default Sidebar;
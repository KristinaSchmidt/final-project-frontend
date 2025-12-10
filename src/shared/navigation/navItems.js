import homeIcon from "../../assets/icons/home.png";
import createIcon from "../../assets/icons/create.png";
import exploreIcon from "../../assets/icons/explore.png";
import ichgramIcon from "../../assets/icons/ichgram.png";
import messagesIcon from "../../assets/icons/messages.png";
import notificationsIcon from "../../assets/icons/notifications.png";
import searchIcon from "../../assets/icons/search.png";
import profile from "../../assets/icons/profile.png";



export const navItems= [
    {
        id:"home",
        label:"Home",
        path: "/",
        icon:homeIcon,
        showInSidebar: true,
        showInFooter: true,
    },

    {
        id:"search",
        label:"Search",
        path: "/search",
        icon:searchIcon,
        showInSidebar: true,
        showInFooter: true,
    },

    {
        id:"explore",
        label:"Explore",
        path: "/explore",
        icon:exploreIcon,
        showInSidebar: true,
        showInFooter: true,
    },

    {
        id:"messages",
        label:"Messages",
        path: "/messages",
        icon:messagesIcon,
        showInSidebar: true,
        showInFooter: true,
    },

    {
        id:"notifications",
        label:"Notifications",
        path: "/notifications",
        icon:notificationsIcon,
        showInSidebar: true,
        showInFooter: true,
    },

    {
        id:"create",
        label:"Create",
        path: "/create",
        icon:createIcon,
        showInSidebar: true,
        showInFooter: true,
    },

    {
        id:"profile",
        label:"Profile",
        path: "/profile",
        // icon:profile,
        showInSidebar: true,
        showInFooter: false,
    },
    {
        id:"ichgram",
        label:"ICHgram",
        path: "/ichgram",
        icon:ichgramIcon,
        showInSidebar: false,
        showInFooter: true,
    },
]
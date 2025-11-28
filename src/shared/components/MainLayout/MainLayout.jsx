import styles from "./MainLayout.module.css";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";


const MainLayout = ({ children }) => {
  return (
    <div className={styles.layout}>
        <aside className={styles.sidebar}>
            <Sidebar />
        </aside>

        <div className={styles.right}>
            <main className={styles.content}>
            {children}
            </main>

        <Footer />
        </div>
    </div>
  );
};

export default MainLayout;
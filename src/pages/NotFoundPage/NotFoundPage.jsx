import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";
import instagramPhone from "../../assets/images/instagramPhone.svg";

const NotFoundPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <div className={styles.imageBox}>
          <img
            className={styles.image}
            src={instagramPhone}
            alt="Page not found"
          />
        </div>
        <div className={styles.textBox}>
          <h1 className={styles.title}>Oops! Page Not Found (404 Error)</h1>

          <p className={styles.text}>
            We&apos;re sorry, but the page you&apos;re looking for doesn&apos;t
            seem to exist.
          </p>
          <p className={styles.text}>
            If you typed the URL manually, please double-check the spelling. If
            you clicked on a link, it may be outdated or broken.
          </p>

          <Link className={styles.btn} to="/">
            Go to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
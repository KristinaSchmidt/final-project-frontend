import { useEffect, useState } from "react";
import styles from "./NotificationPage.module.css";

const NotificationsPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("/api/notifications");
        if (!res.ok) {
          throw new Error("Error");
        }

        const data = await res.json();
        // später ans Backend anpassen
        setItems(data.notifications ?? data);
      } catch (e) {
        console.log(e);
        setError("Could not load data");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.overlay}></div>

      <section className={styles.box}>
        <h1 className={styles.title}>Notifications</h1>

        <p className={styles.smallTitle}>New</p>

        {loading && <p className={styles.info}>Loading...</p>}
        {!loading && error && <p className={styles.info}>{error}</p>}

        {!loading && !error && items.length === 0 && (
          <p className={styles.info}>No notifications</p>
        )}

        {!loading && !error && items.length > 0 && (
          <ul className={styles.list}>
            {items.map((item) => (
              <li key={item.id} className={styles.row}>
                <div className={styles.avatar}>
                  {(item.user?.username || item.user?.name || "U")
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div className={styles.textBox}>
                  <div className={styles.textLine}>
                    <span className={styles.name}>
                      {item.user?.username || "User"}
                    </span>
                    <span className={styles.text}>
                      {item.message || "did something"}
                    </span>
                  </div>
                  <span className={styles.time}>{item.time || "now"}</span>
                </div>

                <div className={styles.image}></div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default NotificationsPage;
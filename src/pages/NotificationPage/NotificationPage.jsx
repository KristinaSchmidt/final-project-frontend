import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NotificationPage.module.css";
import Avatar from "../../shared/components/Avatar/Avatar.jsx";

const API_URL = import.meta.env.VITE_API_URL || "";
const API_ORIGIN = API_URL ? new URL(API_URL).origin : window.location.origin;

const toAbs = (url) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${API_ORIGIN}${url.startsWith("/") ? "" : "/"}${url}`;
};

const timeAgoShort = (dateValue) => {
  if (!dateValue) return "";
  const d = new Date(dateValue);
  const diffMs = Date.now() - d.getTime();
  if (Number.isNaN(diffMs)) return "";

  const sec = Math.floor(diffMs / 1000);
  if (sec < 60) return "now";

  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} m`;

  const h = Math.floor(min / 60);
  if (h < 24) return `${h} h`;

  const days = Math.floor(h / 24);
  if (days < 7) return `${days} d`;

  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks} w`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} mo`;

  const years = Math.floor(days / 365);
  return `${years} y`;
};

const buildText = (n) => {
  const type = n?.type || "";
  const message = n?.message || "";

  if (message) return message;

  switch (type) {
    case "like":
      return "liked your photo.";
    case "comment":
      return "commented your photo.";
    case "follow":
      return "started following.";
    default:
      return "did something.";
  }
};

const NotificationsPage = () => {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const ctrl = new AbortController();

    const load = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");
        const res = await fetch(`${API_URL || ""}/api/notifications`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          signal: ctrl.signal,
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        const list = Array.isArray(data) ? data : data.notifications || [];
        setItems(list);
      } catch (e) {
        if (e?.name === "AbortError") return;
        console.log(e);
        setError("Could not load notifications");
      } finally {
        setLoading(false);
      }
    };

    load();
    return () => ctrl.abort();
  }, []);

  const normalized = useMemo(() => {
    return (items || []).map((n) => {
      const actor = n.actor || n.fromUser || n.user || {};
      const username = actor.username || actor.name || "User";
      const avatarUrl = toAbs(actor.avatarUrl || actor.avatar || actor.image || "");
      const createdAt = n.createdAt || n.date || n.time || null;
      const post = n.post || {};
      const thumbUrl = toAbs(post.imageUrl || post.image || n.thumbnailUrl || n.thumb || "");

      return {
        id: n._id || n.id || `${username}-${createdAt}-${Math.random()}`,
        username,
        avatarUrl,
        text: buildText(n),
        time: timeAgoShort(createdAt),
        thumbUrl,
      };
    });
  }, [items]);

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={styles.overlay}
        onClick={handleClose}
        aria-label="Close notifications"
      />

      <section className={styles.box} aria-label="Notifications panel">
        <h1 className={styles.title}>Notifications</h1>
        <p className={styles.smallTitle}>New</p>

        {loading && <p className={styles.info}>Loading...</p>}
        {!loading && error && <p className={styles.info}>{error}</p>}

        {!loading && !error && normalized.length === 0 && (
          <p className={styles.info}>No notifications</p>
        )}

        {!loading && !error && normalized.length > 0 && (
          <ul className={styles.list}>
            {normalized.map((n) => (
              <li key={n.id} className={styles.row}>
                <div className={styles.avatarWrap}>
                  <Avatar src={n.avatarUrl} alt={`${n.username} avatar`} size="md" />
                </div>

                <div className={styles.textBox}>
                  <span className={styles.name}>{n.username}</span>{" "}
                  <span className={styles.text}>{n.text}</span>{" "}
                  {n.time && <span className={styles.time}>{n.time}</span>}
                </div>

                <div className={styles.thumbWrap}>
                  {n.thumbUrl ? (
                    <img className={styles.thumb} src={n.thumbUrl} alt="Post thumbnail" />
                  ) : (
                    <div className={styles.thumbPlaceholder} />
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default NotificationsPage;
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NotificationPage.module.css";
import Avatar from "../../shared/components/Avatar/Avatar.jsx";

import {
  getNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from "../../shared/api/notification-api.js";

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
      return "started following you.";
    default:
      return "did something.";
  }
};

const NotificationsPage = () => {
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);


  const [error, setError] = useState("");

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    let alive = true;

    const load = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getNotifications();
        const list = Array.isArray(data) ? data : data?.notifications || [];

        if (!alive) return;
        setItems(list);
      } catch (e) {
        const status = e?.response?.status;
        const serverMsg = e?.response?.data?.message;
        const msg = serverMsg || e?.message || "Could not load notifications";

        console.log("Notifications error:", e);
        if (!alive) return;

        if (status === 401) {
          setError("Unauthorized (please login again)");
          return;
        }

        setError(msg);
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    };

    load();
    return () => {
      alive = false;
    };
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
        id: n._id || n.id,
        isRead: Boolean(n.isRead),
        username,
        avatarUrl,
        text: buildText(n),
        time: timeAgoShort(createdAt),
        thumbUrl,
      };
    });
  }, [items]);

  const handleClose = () => navigate(-1);

  const onMarkAllRead = async () => {
    try {
      await markAllNotificationsRead();
      setItems((prev) => prev.map((x) => ({ ...x, isRead: true })));
      setMenuOpen(false);
    } catch (e) {
      const msg = e?.response?.data?.message || e?.message || "Failed to mark all read";
      setError(msg);
    }
  };

  const onMarkOneRead = async (id) => {
    if (!id) return;
    try {
      await markNotificationRead(id);
      setItems((prev) => prev.map((x) => (x._id === id || x.id === id ? { ...x, isRead: true } : x)));
    } catch (e) {
      console.log(e);
    }
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
        <div className={styles.header}>
          <h1 className={styles.title}>Notifications</h1>


          
     
    
        </div>

        <p className={styles.smallTitle}>New</p>

        {loading && <p className={styles.info}>Loading...</p>}
        {!loading && error && <p className={styles.infoError}>{error}</p>}

        {!loading && !error && normalized.length === 0 && (
          <p className={styles.info}>No notifications</p>
        )}

        {!loading && !error && normalized.length > 0 && (
          <ul className={styles.list}>
            {normalized.map((n) => (
              <li
                key={n.id}
                className={`${styles.row} ${n.isRead ? "" : styles.unread}`}
                onClick={() => onMarkOneRead(n.id)}
              >
                <div className={styles.avatarWrap}>
                  <Avatar src={n.avatarUrl} alt={`${n.username} avatar`} size="md" />
                </div>

                <div className={styles.textBox}>
                  <div className={styles.line}>
                    <span className={styles.name}>{n.username}</span>{" "}
                    <span className={styles.text}>{n.text}</span>
                  </div>
                  <div className={styles.meta}>
                    {n.time && <span className={styles.time}>{n.time}</span>}
                    {!n.isRead && <span className={styles.dot} />}
                  </div>
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
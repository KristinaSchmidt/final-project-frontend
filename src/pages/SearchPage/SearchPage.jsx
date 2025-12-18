import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import instance from "../../shared/api/instance";
import styles from "./SearchPage.module.css";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "";
const API_ORIGIN = API_URL ? new URL(API_URL).origin : window.location.origin;
const DEFAULT_AVATAR = `${API_ORIGIN}/images/default-avatar.jpg`;

const toAbs = (url) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${API_ORIGIN}${url.startsWith("/") ? "" : "/"}${url}`;
};

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.auth?.user);
  const myId = authUser?._id;

  useEffect(() => {
    const value = query.trim();

    if (!value) {
      setUsers([]);
      return;
    }

    const t = setTimeout(async () => {
      try {
        setLoading(true);

        const res = await instance.get(`/users`, {
          params: { search: value },
        });

        const list = Array.isArray(res.data) ? res.data : res.data?.users || [];
        setUsers(list);
      } catch (e) {
        console.error("Search error:", e);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(t);
  }, [query]);

  const handleClear = () => {
    setQuery("");
    setUsers([]);
  };


  const openUser = (userId) => {
    if (!userId) return;

    if (myId && String(userId) === String(myId)) {
      navigate("/profile");
    } else {
      navigate(`/user/${userId}`);
    }
  };

  return (
    <div className={styles.searchLayout}>
      <div className={styles.overlay} />

      <section className={styles.searchPanel}>
        <h1 className={styles.title}>Search</h1>

        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Search by username or fullname"
            className={styles.input}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {!!query && (
            <button
              className={styles.inputButton}
              type="button"
              onClick={handleClear}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        <div className={styles.recentSection}>
          <div className={styles.recentHeader}>
            <span className={styles.recentTitle}>Results</span>
          </div>

          {!query && <p className={styles.emptyText}>Type to search users</p>}
          {query && loading && <p className={styles.emptyText}>Searching…</p>}
          {query && !loading && users.length === 0 && (
            <p className={styles.emptyText}>No users found</p>
          )}

          {users.length > 0 && (
            <ul className={styles.resultList}>
              {users.map((u) => {
                const avatar =
                  toAbs(u?.profile?.avatar) ||
                  toAbs(u?.avatar) ||
                  toAbs(u?.avatarUrl) ||
                  DEFAULT_AVATAR;

                const fullName =
                  u?.fullName ||
                  u?.profile?.fullName ||
                  u?.name ||
                  "";

                return (
                  <li
                    key={u._id}
                    className={styles.resultItem}
                    onClick={() => openUser(u._id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && openUser(u._id)}
                  >
                    <img
                      src={avatar}
                      alt={u?.username || "user"}
                      className={styles.avatar}
                    />

                    <div className={styles.userInfo}>
                      <span className={styles.username}>
                        {u?.username || "user"}
                      </span>

                      {!!fullName && (
                        <span className={styles.fullName}>{fullName}</span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};

export default SearchPage;
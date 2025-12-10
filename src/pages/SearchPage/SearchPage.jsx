import { useState } from "react";
import styles from "./SearchPage.module.css";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);

  const handleChange = async (event) => {
    const value = event.target.value;
    setQuery(value);

    if (!value.trim()) {
      setUsers([]);
      return;
    }

    try {
      const response = await fetch(
        `/api/users?search=${encodeURIComponent(value)}`
      );
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const handleClear = () => {
    setQuery("");
    setUsers([]);
  };

  return (
    <div className={styles.searchLayout}>
      <div className={styles.overlay} />

      <section className={styles.searchPanel}>
        <h1 className={styles.title}>Search</h1>

        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Search"
            className={styles.input}
            value={query}
            onChange={handleChange}
          />
          <button
            className={styles.inputButton}
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
          >
            ×
          </button>
        </div>

        <div className={styles.recentSection}>
          <div className={styles.recentHeader}>
            <span className={styles.recentTitle}>Recent</span>
          </div>

          {users.length === 0 && !query && (
            <p className={styles.emptyText}>No recent searches</p>
          )}

          {users.length === 0 && query && (
            <p className={styles.emptyText}>No users found</p>
          )}

          {users.length > 0 && (
            <ul className={styles.resultList}>
              {users.map((user) => (
                <li key={user._id} className={styles.resultItem}>
                  <img
                    src={user.avatarUrl}
                    alt={user.username}
                    className={styles.avatar}
                  />
                  <div className={styles.userInfo}>
                    <span className={styles.username}>{user.username}</span>
                    <span className={styles.fullName}>{user.fullName}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};

export default SearchPage;
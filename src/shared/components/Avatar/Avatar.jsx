import styles from "./Avatar.module.css";

const API_ORIGIN = new URL(import.meta.env.VITE_API_URL).origin;
const DEFAULT_AVATAR = `${API_ORIGIN}/images/default-avatar.jpg`;

const Avatar = ({ src, alt = "User avatar", size = "md" }) => {
  const sizeClass = styles[`avatar--${size}`] || styles["avatar--md"];

  const finalSrc = src && src.trim() ? src : DEFAULT_AVATAR;

  return (
    <div className={`${styles.avatar} ${sizeClass}`}>
      <img
        src={finalSrc}
        alt={alt}
        className={styles.image}
        onError={(e) => {
          e.currentTarget.src = DEFAULT_AVATAR;
        }}
      />
    </div>
  );
};

export default Avatar;
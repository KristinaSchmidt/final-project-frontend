import { useState } from "react";
import styles from "./PostCard.module.css";

const PostCard = ({
  post,
  user,
  onDelete,
  onEdit,
  onGoToPost,
  onCopyLink,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuOpen = () => {
    setShowMenu(true);
  };

  const handleMenuClose = () => {
    setShowMenu(false);
  };

  return (
    <div className={styles.postWrapper}>
      {/* Kopf: Avatar + Name + 3 Punkte */}
      <div className={styles.postTop}>
        <div className={styles.postTopLeft}>
          <div className={styles.avatarSmall}>
            <img
              src={user.avatar}
              alt="avatar"
              className={styles.avatarImg}
            />
          </div>
          <span className={styles.userName}>{user.name}</span>
        </div>

        <button
          type="button"
          className={styles.menuBtn}
          onClick={handleMenuOpen}
        >
          &#8226;&#8226;&#8226;
        </button>
      </div>

      {/* Bild */}
      <div className={styles.postImageBox}>
        <img
          src={post.src}
          alt={post.alt}
          className={styles.postImg}
        />
      </div>

      {/* Text + Kommentare */}
      <div className={styles.postBody}>
        <p className={styles.postText}>{post.text}</p>

        {post.comments?.length > 0 && (
          <ul className={styles.commentList}>
            {post.comments.map((c) => (
              <li key={c.id} className={styles.commentRow}>
                <span className={styles.commentUser}>{c.user}</span>
                <span>{c.text}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Likes + Zeit + Kommentar-Eingabe */}
      <div className={styles.postBottom}>
        <p className={styles.likes}>{post.likes} likes</p>
        <p className={styles.time}>{post.time}</p>

        <form className={styles.commentForm}>
          <input
            className={styles.commentInput}
            type="text"
            placeholder="Add comment"
          />
          <button type="button" className={styles.commentSend}>
            Send
          </button>
        </form>
      </div>

      {/* Menü wie in deinem Screenshot */}
      {showMenu && (
        <div
          className={styles.menu}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className={`${styles.menuItem} ${styles.menuItemDanger}`}
            onClick={() => {
              onDelete(post);
              handleMenuClose();
            }}
          >
            Delete
          </button>

          <button
            type="button"
            className={styles.menuItem}
            onClick={() => {
              onEdit(post);
              handleMenuClose();
            }}
          >
            Edit
          </button>

          <button
            type="button"
            className={styles.menuItem}
            onClick={() => {
              onGoToPost(post);
              handleMenuClose();
            }}
          >
            Go to post
          </button>

          <button
            type="button"
            className={styles.menuItem}
            onClick={() => {
              onCopyLink(post);
              handleMenuClose();
            }}
          >
            Copy link
          </button>

          <button
            type="button"
            className={styles.menuItem}
            onClick={handleMenuClose}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default PostCard;
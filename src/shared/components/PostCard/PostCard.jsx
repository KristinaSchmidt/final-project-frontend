import { useEffect, useMemo, useState } from "react";
import styles from "./PostCard.module.css";
import { getPostComments, toggleLikePost, addCommentToPost } from "../../api/post-api";

const API_URL = import.meta.env.VITE_API_URL || "";
const API_ORIGIN = API_URL ? new URL(API_URL).origin : window.location.origin;
const DEFAULT_AVATAR = `${API_ORIGIN}/images/default-avatar.jpg`;

const toAbs = (url) => {
  if (!url) return "";
  if (typeof url !== "string") return "";
  if (url.startsWith("http")) return url;
  return `${API_ORIGIN}${url.startsWith("/") ? "" : "/"}${url}`;
};

const PostCard = ({ post, authUserId, authUser, onOpenPost }) => {
  const [commentsPreview, setCommentsPreview] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [likesCount, setLikesCount] = useState(post?.likesCount ?? 0);
  const [likedByMe, setLikedByMe] = useState(!!post?.likedByMe);
  const postId = post?._id;
  const author = post?.author;
  const authorId = author?._id || author?.id;
  const myId = authUserId || authUser?._id || authUser?.id;
  const isMe = !!(myId && authorId && String(myId) === String(authorId));
  const username =
    author?.username ||
    post?.username ||
    (isMe ? authUser?.username : null) ||
    "user";


  const avatar =
    toAbs(author?.profile?.avatar) ||
    toAbs(author?.profile?.avatarUrl) ||
    toAbs(author?.avatar) ||
    toAbs(author?.avatarUrl) ||
    (isMe
      ? toAbs(authUser?.profile?.avatar) ||
        toAbs(authUser?.profile?.avatarUrl) ||
        toAbs(authUser?.avatar) ||
        toAbs(authUser?.avatarUrl)
      : "") ||
    DEFAULT_AVATAR;

  const createdAt = post?.createdAt;
  const time = useMemo(() => {
    if (!createdAt) return "";
    return new Date(createdAt).toLocaleString();
  }, [createdAt]);

  const totalCommentsCount = post?.commentsCount ?? post?.comments?.length ?? null;

  useEffect(() => {
    if (!postId) return;
    let mounted = true;

    const loadPreview = async () => {
      try {
        const data = await getPostComments(postId);
        const list = Array.isArray(data) ? data : data.comments || [];
        if (mounted) setCommentsPreview(list.slice(0, 2));
      } catch (e) {
        console.log(e);
      }
    };

    loadPreview();
    return () => {
      mounted = false;
    };
  }, [postId]);

  const onLike = async () => {
    if (!postId) return;
    try {
      const data = await toggleLikePost(postId);
      setLikesCount(data.likesCount);
      setLikedByMe(data.likedByMe);
    } catch (e) {
      console.log(e);
    }
  };

  const submitComment = async (e) => {
    e.preventDefault();
    const text = commentText.trim();
    if (!text || !postId) return;

    try {
      const data = await addCommentToPost(postId, text);
      setCommentsPreview((prev) => [data.comment, ...prev].slice(0, 2));
      setCommentText("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <div className={styles.user}>
          <img
            className={styles.avatar}
            src={avatar}
            alt="avatar"
            onError={(e) => {
              e.currentTarget.src = DEFAULT_AVATAR;
            }}
          />
          <div className={styles.userMeta}>
            <div className={styles.userLine}>
              <span className={styles.username}>{username}</span>

              {!isMe && (
                <>
                  <span className={styles.dot}>•</span>
                  <span className={styles.following}>following</span>
                </>
              )}
            </div>

            <div className={styles.time}>{time}</div>
          </div>
        </div>
      </div>

      <button className={styles.imageBtn} type="button" onClick={() => onOpenPost?.(postId)}>
        <img className={styles.image} src={toAbs(post?.imageUrl)} alt="post" />
      </button>

      <div className={styles.actions}>
        <button className={styles.iconBtn} type="button" onClick={onLike} aria-label="Like">
          {likedByMe ? "♥" : "♡"}
        </button>

        <button className={styles.iconBtn} type="button" onClick={() => onOpenPost?.(postId)} aria-label="Comment">
          💬
        </button>
      </div>

      <div className={styles.likes}>{likesCount} likes</div>

      {post?.text && (
        <div className={styles.caption}>
          <span className={styles.username}>{username}</span>{" "}
          <span>{post.text}</span>
        </div>
      )}

      {(totalCommentsCount !== null && totalCommentsCount > 0) || commentsPreview.length > 0 ? (
        <button className={styles.viewAll} type="button" onClick={() => onOpenPost?.(postId)}>
          View all comments{totalCommentsCount !== null ? ` (${totalCommentsCount})` : ""}
        </button>
      ) : null}

      {commentsPreview.length > 0 && (
        <ul className={styles.comments}>
          {commentsPreview.map((c) => (
            <li key={c._id} className={styles.commentRow}>
              <span className={styles.username}>{c.user?.username || "user"}</span>{" "}
              <span>{c.text}</span>
            </li>
          ))}
        </ul>
      )}

      <form className={styles.commentForm} onSubmit={submitComment}>
        <input
          className={styles.commentInput}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment…"
        />
        <button className={styles.postBtn} type="submit" disabled={!commentText.trim()}>
          Post
        </button>
      </form>
    </article>
  );
};

export default PostCard;
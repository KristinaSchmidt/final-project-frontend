import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./PostModal.module.css";
import Avatar from "../Avatar/Avatar.jsx";
import { addCommentToPost, getPostById, toggleLikePost } from "../../api/post-api";


const API_URL = import.meta.env.VITE_API_URL || "";
const API_ORIGIN = API_URL ? new URL(API_URL).origin : window.location.origin;
const DEFAULT_AVATAR = `${API_ORIGIN}/images/default-avatar.jpg`;

const toAbs = (url) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${API_ORIGIN}${url.startsWith("/") ? "" : "/"}${url}`;
};

const pickUsername = (u) => u?.username || u?.fullname || u?.name || "user";

const pickAvatar = (u) => {
  const raw =
    u?.avatar ||
    u?.avatarUrl ||
    u?.profile?.avatar ||
    u?.profile?.avatarUrl ||
    "";
  return toAbs(raw) || DEFAULT_AVATAR;
};

const pickPostImage = (p) => {
  const raw = p?.imageUrl || p?.image || p?.photo || "";
  return toAbs(raw);
};

const PostModal = ({ isOpen, onClose, postId, onDeleted }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [sending, setSending] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e) => {
      if (e.key !== "Escape") return;

      if (isEditOpen) {
        setIsEditOpen(false);
        return;
      }
      onClose?.();
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, isEditOpen]);

  useEffect(() => {
    if (!isOpen || !postId) return;

    const load = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getPostById(postId);
        setPost(data?.post ?? data);
      } catch (e) {
        console.log(e);
        setError("Could not load post");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [isOpen, postId]);

  const author = post?.author || null;

  const username = useMemo(() => pickUsername(author), [author]);
  const avatar = useMemo(() => pickAvatar(author), [author]);
  const imageUrl = useMemo(() => pickPostImage(post), [post]);

  const caption = post?.text || "";
  const likesCount = post?.likesCount ?? 0;
  const likedByMe = !!post?.likedByMe;

  const comments = useMemo(() => {
    const list = post?.comments;
    return Array.isArray(list) ? list.filter(Boolean) : [];
  }, [post]);

  const onLike = async () => {
    const id = post?._id || post?.id;
    if (!id) return;

    try {
      const data = await toggleLikePost(id);
      const payload = data?.post ?? data;

      setPost((prev) => ({
        ...(prev || {}),
        likesCount: payload?.likesCount ?? prev?.likesCount ?? 0,
        likedByMe: payload?.likedByMe ?? prev?.likedByMe ?? false,
      }));
    } catch (e) {
      console.log(e);
    }
  };

  const submitComment = async (e) => {
    e.preventDefault();

    const text = comment.trim();
    const id = post?._id || post?.id;
    if (!text || !id || sending) return;

    try {
      setSending(true);

      const data = await addCommentToPost(id, text);

      if (data?.post) {
        setPost(data.post);
      } else {
        const newComment = data?.comment ?? data;
        if (newComment) {
          setPost((prev) => ({
            ...(prev || {}),
            comments: [...(Array.isArray(prev?.comments) ? prev.comments : []), newComment].filter(Boolean),
          }));
        }
      }

      setComment("");
      inputRef.current?.focus();
    } catch (e2) {
      console.log(e2);
    } finally {
      setSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onMouseDown={onClose}>
        <div className={styles.modal} onMouseDown={(e) => e.stopPropagation()}>
          <div className={styles.left}>
            {imageUrl ? (
              <img className={styles.image} src={imageUrl} alt="post" />
            ) : (
              <div className={styles.imagePlaceholder} />
            )}
          </div>

          <div className={styles.right}>
            <div className={styles.top}>
              <div className={styles.userRow}>
                <Avatar src={avatar} alt="avatar" size="sm" />
                <span className={styles.username}>{username}</span>
              </div>

              <button
                className={styles.closeBtn}
                type="button"
                onClick={() => setIsEditOpen(true)}
                aria-label="Post options"
                title="Options"
              >
                ⋯
              </button>
            </div>

            <div className={styles.body}>
              {loading && <p className={styles.loading}>Loading...</p>}
              {error && <p className={styles.error}>{error}</p>}

              {!loading && post && (
                <>
                  {caption && (
                    <div className={styles.captionRow}>
                      <Avatar src={avatar} alt="avatar" size="sm" />
                      <div>
                        <span className={styles.username}>{username}</span>{" "}
                        <span className={styles.captionText}>{caption}</span>
                      </div>
                    </div>
                  )}

                  {comments.length > 0 && (
                    <ul className={styles.commentList}>
                      {comments.map((c, idx) => {
                        const u = c?.user || c?.author || c?.actor || null;
                        const cName = pickUsername(u);
                        const cAvatar = pickAvatar(u);
                        const cText = c?.text || c?.commentText || "";

                        return (
                          <li key={c?._id || c?.id || `${post?._id}-c-${idx}`} className={styles.commentRow}>
                            <Avatar src={cAvatar} alt="avatar" size="sm" />
                            <div>
                              <span className={styles.username}>{cName}</span>{" "}
                              <span className={styles.commentText}>{cText}</span>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </>
              )}
            </div>

            <div className={styles.bottom}>
              <div className={styles.actionsRow}>
                <button className={styles.iconBtn} type="button" onClick={onLike} aria-label="Like" title="Like">
                  {likedByMe ? "♥" : "♡"}
                </button>

                <button
                  className={styles.iconBtn}
                  type="button"
                  onClick={() => inputRef.current?.focus()}
                  aria-label="Comment"
                  title="Comment"
                >
                  💬
                </button>
              </div>

              <div className={styles.likes}>{likesCount} likes</div>

              <form className={styles.commentForm} onSubmit={submitComment}>
                <input
                  ref={inputRef}
                  className={styles.commentInput}
                  placeholder="Add comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button className={styles.commentSend} type="submit" disabled={!comment.trim() || sending}>
                  {sending ? "..." : "Send"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      
    </>
  );
};

export default PostModal;
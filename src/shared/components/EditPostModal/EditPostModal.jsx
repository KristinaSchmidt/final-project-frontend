import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import styles from "./EditPostModal.module.css";
import { updatePost, deletePost } from "../../api/post-api";

const EditPostModal = ({ isOpen, onClose, post, onUpdated, onDeleted }) => {
  const navigate = useNavigate();

  const [mode, setMode] = useState("menu"); // "menu" | "edit"
  const [text, setText] = useState("");
  const [saving, setSaving] = useState(false);

  const postId = post?._id;

  const postLink = useMemo(() => {
    if (!postId) return "";
    return `${window.location.origin}/posts/${postId}`;
  }, [postId]);

  const EMOJIS = ["😀","😂","😍","🥰","😎","😢","😡","🔥","❤️","👍","👏","🎉","✨","🙏"];

  const insertEmoji = (emoji) => {
    setText((prev) => (prev ?? "") + emoji);
  };

  useEffect(() => {
    if (!isOpen) return;
    setMode("menu");
    setText(post?.text ?? "");
  }, [isOpen, post]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key !== "Escape") return;
      if (mode === "edit") setMode("menu");
      else onClose?.();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose, mode]);

  if (!isOpen) return null;

  const close = () => onClose?.();

  const handleCopyLink = async () => {
    if (!postLink) return;
    try {
      await navigator.clipboard.writeText(postLink);
    } catch {
      window.prompt("Copy link:", postLink);
    } finally {
      close();
    }
  };

  const handleGoToPost = () => {
    if (!postId) return;
    close();
    navigate(`/posts/${postId}`);
  };

  const handleDelete = async () => {
    if (!postId) return;
    await deletePost(postId);
    onDeleted?.(postId);
    close();
  };

  const handleSaveEdit = async () => {
    if (!postId) return;
    const nextText = text.trim();

    try {
      setSaving(true);
      const data = await updatePost(postId, { text: nextText });
      if (data?.post) onUpdated?.(data.post);
      else onUpdated?.({ ...post, text: nextText });
      close();
    } finally {
      setSaving(false);
    }
  };

  return createPortal(
    <div
      className={styles.overlay}
      onMouseDown={(e) => e.target === e.currentTarget && close()}
    >
      <div className={styles.sheet} onMouseDown={(e) => e.stopPropagation()}>
        {mode === "menu" ? (
          <>
            <button className={`${styles.item} ${styles.danger}`} onClick={handleDelete}>
              Delete
            </button>
            <div className={styles.divider} />

            <button className={styles.item} onClick={() => setMode("edit")}>
              Edit
            </button>
            <div className={styles.divider} />

            <button className={styles.item} onClick={handleGoToPost}>
              Go to post
            </button>
            <div className={styles.divider} />

            <button className={styles.item} onClick={handleCopyLink}>
              Copy link
            </button>
            <div className={styles.divider} />

            <button className={styles.item} onClick={close}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <div className={styles.editHeader}>
              <button className={styles.back} type="button" onClick={() => setMode("menu")}>
                ←
              </button>

              <div className={styles.editTitle}>Edit</div>

              <button
                className={styles.save}
                type="button"
                onClick={handleSaveEdit}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>

            <div className={styles.editBody}>
              <textarea
                className={styles.textarea}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Edit text..."
              />

              <div className={styles.emojiRow}>
                {EMOJIS.map((e) => (
                  <button
                    key={e}
                    type="button"
                    className={styles.emojiBtn}
                    onClick={() => insertEmoji(e)}
                    aria-label={`emoji ${e}`}
                    title={e}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
};

export default EditPostModal;
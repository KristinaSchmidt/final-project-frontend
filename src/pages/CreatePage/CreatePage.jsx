import { useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import styles from "./CreatePage.module.css";
import { useNavigate } from "react-router-dom";
import Avatar from "../../shared/components/Avatar/Avatar.jsx";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/auth/authSelectors";
import { createPost } from "../../shared/api/post-api";

const CreatePage = () => {
  const user = useSelector(selectUser);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const textareaRef = useRef(null);
  const maxText = 200;
  const navigate = useNavigate();
  const closeBox = () => navigate("/profile");

  const handleFileChange = (e) => {
    const img = e.target.files?.[0];
    if (!img) return;
    setFile(img);
    setPreview(URL.createObjectURL(img));
  };

  const handleTextChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxText) setText(value);
  };

  const onEmojiClick = (emojiData) => {
    const emoji = emojiData.emoji;
    const el = textareaRef.current;
    if (!el) {
      setText((prev) => (prev + emoji).slice(0, maxText));
      return;
    }

    const start = el.selectionStart ?? text.length;
    const end = el.selectionEnd ?? text.length;

    const newValue = (text.slice(0, start) + emoji + text.slice(end)).slice(
      0,
      maxText
    );
    setText(newValue);

    requestAnimationFrame(() => {
      el.focus();
      const cursor = Math.min(start + emoji.length, maxText);
      el.setSelectionRange(cursor, cursor);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please choose a photo");
      return;
    }
    try {
      setSending(true);
      setError("");
      const formData = new FormData();
      formData.append("image", file);
      formData.append("text", text);
      await createPost(formData);
      closeBox();
    } catch (err) {
      console.log(err);
      setError("Could not save post");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.overlay} onClick={closeBox}></div>

      <div className={styles.box}>
        <div className={styles.top}>
          <span className={styles.title}>Create new post</span>
          <button
            type="submit"
            form="create-form"
            className={styles.topBtn}
            disabled={sending}
          >
            Share
          </button>
        </div>

        <form
          id="create-form"
          className={styles.content}
          onSubmit={handleSubmit}
        >
          <div className={styles.left}>
            {!preview && (
              <label className={styles.uploadBox}>
                <span className={styles.uploadIcon}>☁️</span>
                <span className={styles.uploadText}>Click to upload photo</span>
                <input
                  type="file"
                  accept="image/*"
                  className={styles.fileInput}
                  onChange={handleFileChange}
                />
              </label>
            )}

            {preview && (
              <div className={styles.previewBox}>
                <img
                  src={preview}
                  alt="new post"
                  className={styles.previewImg}
                />
              </div>
            )}
          </div>

          <div className={styles.right}>
            <div className={styles.rightTop}>
              <div className={styles.userRow}>
                <Avatar src={user?.profile?.avatar} alt="avatar" size="sm" />
                <span className={styles.userName}>
                  {user?.username || "your_name"}
                </span>
              </div>

              <textarea
                className={styles.textarea}
                placeholder="Write a caption..."
                value={text}
                onChange={handleTextChange}
              />
            </div>

            <div className={styles.rightBottom}>
              <button
                type="button"
                className={styles.emojiBtn}
                onClick={() => setShowEmoji((s) => !s)}
                aria-label="Add emoji"
              >
                🙂
              </button>

              <span className={styles.counter}>
                {text.length} / {maxText}
              </span>

              {showEmoji && (
                <div className={styles.emojiPicker}>
                  <EmojiPicker
                    onEmojiClick={onEmojiClick}
                    height={320}
                    width={300}
                  />
                </div>
              )}
            </div>

            {error && <p className={styles.error}>{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;

import { useState } from "react";
import styles from "./CreatePage.module.css";
import { useNavigate } from "react-router-dom";
import Avatar from "../../shared/components/Avatar/Avatar.jsx";
const avatarSrc = "https://via.placeholder.com/40";

const CreatePage = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const maxText = 200;
  const navigate = useNavigate();

  // Fenster schließen (zurück zum Profil oder vorige Seite)
  const closeBox = () => {
    navigate("/profile");      // oder: navigate(-1);
  };

  const handleFileChange = (e) => {
    const img = e.target.files && e.target.files[0];
    if (!img) return;
    setFile(img);
    setPreview(URL.createObjectURL(img));
  };

  const handleTextChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxText) {
      setText(value);
    }
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

      // 🔑 Token vom eingeloggten User (z.B. beim Login gespeichert)
      const token = localStorage.getItem("token");

      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // sagt dem Backend, WER den Post macht
        },
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Error create post");
      }

      // alles gut → zurück zum Profil (Posts dieses Users)
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
    {/* dunkler Hintergrund NUR im Content-Bereich */}
    <div className={styles.overlay} onClick={closeBox}></div>

    {/* zentriertes Fenster */}
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
          {/* linker Bereich */}
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

          {/* rechter Bereich */}
          <div className={styles.right}>
            {/* oberer Bereich: Avatar + Text */}
            <div className={styles.rightTop}>
              <div className={styles.userRow}>
                <Avatar src={avatarSrc} alt="your_name avatar" size="sm" />
                <span className={styles.userName}>your_name</span>
              </div>

              <textarea
                className={styles.textarea}
                placeholder="Write a caption..."
                value={text}
                onChange={handleTextChange}
              />
            </div>

            {/* unterer Bereich: kleine Leiste mit Counter */}
            <div className={styles.rightBottom}>
              <span className={styles.counter}>
                {text.length} / {maxText}
              </span>
            </div>

            {error && <p className={styles.error}>{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;
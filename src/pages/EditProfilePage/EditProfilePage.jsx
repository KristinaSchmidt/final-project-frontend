import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";
import { logoutUser } from "../../store/auth/authOperation.js";
import { selectAccessToken } from "../../store/auth/authSelectors";
import api from "../../shared/api/instance.js";
import styles from "./EditProfilePage.module.css";




const EditProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(selectAccessToken);
  const [form, setForm] = useState({
    username: "",
    website: "",
    about: "",
  });
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showEmojiAbout, setShowEmojiAbout] = useState(false);
  const aboutRef = useRef(null);
  const emojiBoxRef = useRef(null);



  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);


  useEffect(() => {
    if (!token) return;

    const loadUser = async () => {
      try {
        const { data } = await api.get("/auth/current");

        setForm({
          username: data.username || "",
          website: data.profile?.website || "",
          about: data.profile?.about || "",
        });

        setAvatarUrl(data.profile?.avatar || "");
      } catch (err) {
        console.error(err);
        setError("Could not load profile data");
      }
    };

    loadUser();
  }, [token]);


  useEffect(() => {
    const onClick = (e) => {
      if (
        showEmojiAbout &&
        !emojiBoxRef.current?.contains(e.target) &&
        !aboutRef.current?.contains(e.target)
      ) {
        setShowEmojiAbout(false);
      }
    };

    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [showEmojiAbout]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarFile(file);
    setAvatarUrl(URL.createObjectURL(file));
  };

  const onEmojiAbout = (emojiData) => {
    const emoji = emojiData.emoji;
    const el = aboutRef.current;
    const value = form.about || "";

    const start = el?.selectionStart ?? value.length;
    const end = el?.selectionEnd ?? value.length;

    const newValue = value.slice(0, start) + emoji + value.slice(end);
    setForm((prev) => ({ ...prev, about: newValue }));

    requestAnimationFrame(() => {
      el?.focus();
      el?.setSelectionRange(start + emoji.length, start + emoji.length);
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      const formData = new FormData();
      formData.append("username", form.username);
      formData.append("website", form.website);
      formData.append("about", form.about);

      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      await api.patch("/users/me", formData);
      navigate("/profile");
    } catch (err) {
      console.error(err);
      setError("Could not save profile");
    } finally {
      setSaving(false);
    }
  };


  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login", { replace: true });
  };




  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Edit profile</h1>
        <div className={styles.card}>
          <div className={styles.cardLeft}>
            {avatarUrl ? (
              <img src={avatarUrl} alt="avatar" className={styles.avatar} />
            ) : (
              <div className={styles.avatarPlaceholder} />
            )}
          </div>

          <div className={styles.cardRight}>
            <p className={styles.cardName}>{form.username || "username"}</p>
            <p className={styles.cardText}>
              {form.about
                ? form.about.slice(0, 60) +
                  (form.about.length > 60 ? "..." : "")
                : "Add some info about yourself"}
            </p>

            <label className={styles.photoBtn}>
              New photo
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleAvatarChange}
              />
            </label>
          </div>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Username</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Website</label>
          <input
            name="website"
            value={form.website}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>About</label>

          <div className={styles.textareaWrap}>
            <textarea
              ref={aboutRef}
              name="about"
              value={form.about}
              onChange={handleChange}
              className={styles.textarea}
            />
            <button
              type="button"
              className={styles.emojiBtn}
              onClick={() => setShowEmojiAbout((s) => !s)}
            >
              🙂
            </button>

            {showEmojiAbout && (
              <div className={styles.picker} ref={emojiBoxRef}>
                <EmojiPicker
                  onEmojiClick={onEmojiAbout}
                  height={360}
                  width={320}
                  previewConfig={{ showPreview: false }}
                />
              </div>
            )}
          </div>
        </div>

        {error && <p className={styles.error}>{error}</p>}


        <div className={styles.actions}>
          <button className={styles.saveBtn} disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className={styles.logoutBtn}
          >
            Logout
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/auth/authOperation.js";
import { selectUser, selectAccessToken } from "../../store/auth/authSelectors";
import styles from "./EditProfilePage.module.css";
import api from "../../shared/api/instance.js";

const EditProfilePage = () => {
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

  // ---- USER LADEN ----
  useEffect(() => {
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
        console.log(err);
        setError("Could not load profile data.");
      }
    };

    if (token) loadUser();
  }, [token]);

  // ---- INPUT CHANGE ----
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ---- AVATAR ----
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarUrl(URL.createObjectURL(file));
  };

  // ---- SPEICHERN ----
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
    } catch (err) {
      console.log(err);
      setError("Could not save profile");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Edit profile</h1>

        {/* Avatar-Card */}
        <div className={styles.card}>
          <div className={styles.cardLeft}>
            {avatarUrl ? (
              <img src={avatarUrl} className={styles.avatar} />
            ) : (
              <div className={styles.avatarPlaceholder}></div>
            )}
          </div>

          <div className={styles.cardRight}>
            <p className={styles.cardName}>{form.username || "username"}</p>
            <p className={styles.cardText}>
              {form.about
                ? form.about.slice(0, 60) + (form.about.length > 60 ? "..." : "")
                : "Add some info about yourself"}
            </p>

            <label className={styles.photoBtn}>
              New photo
              <input
                type="file"
                accept="image/*"
                className={styles.fileInput}
                onChange={handleAvatarChange}
              />
            </label>
          </div>
        </div>

        {/* Username */}
        <div className={styles.field}>
          <label className={styles.label}>Username</label>
          <input
            name="username"
            className={styles.input}
            value={form.username}
            onChange={handleChange}
          />
        </div>

        {/* Website */}
        <div className={styles.field}>
          <label className={styles.label}>Website</label>
          <input
            name="website"
            className={styles.input}
            value={form.website}
            onChange={handleChange}
          />
        </div>

        {/* About */}
        <div className={styles.field}>
          <label className={styles.label}>About</label>
          <textarea
            name="about"
            className={styles.textarea}
            value={form.about}
            onChange={handleChange}
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button className={styles.saveBtn} disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </button>

        <button onClick={handleLogout} type="button" className={styles.logoutBtn}>
          Logout
        </button>
      </form>
    </div>
  );
};

export default EditProfilePage;
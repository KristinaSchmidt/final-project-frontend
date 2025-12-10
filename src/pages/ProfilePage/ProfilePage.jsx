import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/auth/authSelectors";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../../shared/api/user-api";
import styles from "./ProfilePage.module.css";

const ProfilePage = () => {
  const authUser = useSelector(selectUser); 
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  if (!authUser?._id) return;

  const loadProfile = async () => {
    try {
      const data = await getUserProfile(authUser._id);

      setProfile(data);
    } catch (error) {
      console.error("Profile loading error:", error);
    } finally {
      setLoading(false);
    }
  };

  loadProfile();
}, [authUser]);

  if (loading || !profile) {
    return <div className={styles.wrapper}>Loading...</div>;
  }

  const { user, stats, posts } = profile;

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles.avatarBox}>
          <img
            className={styles.avatar}
            src={user.avatar}
            alt="profile avatar"
          />
        </div>

        <div className={styles.info}>
          <div className={styles.row}>
            <h2 className={styles.name}>{user.username}</h2>

            <button
              className={styles.button}
              onClick={() => navigate("/profile/edit")}
            >
              Edit profile
            </button>
          </div>

          <div className={styles.rowSmall}>
            <span><b>{stats.posts}</b> posts</span>
            <span><b>{stats.followers}</b> followers</span>
            <span><b>{stats.following}</b> following</span>
          </div>

          <div className={styles.bio}>
            <strong>{user.fullname}</strong>
            {user.about && <p>{user.about}</p>}
            {user.website && (
              <a href={user.website} target="_blank" rel="noreferrer">
                {user.website}
              </a>
            )}
          </div>
        </div>
      </div>

      <div className={styles.postsGrid}>
        {posts.map(p => (
          <div key={p._id} className={styles.postBox}>
            <img src={p.imageUrl} alt="post" className={styles.post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
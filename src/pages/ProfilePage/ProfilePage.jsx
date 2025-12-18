import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../store/auth/authSelectors";
import { getMyProfile } from "../../shared/api/user-api";
import styles from "./ProfilePage.module.css";
import Avatar from "../../shared/components/Avatar/Avatar.jsx";
import PostModal from "../../shared/components/PostModal/PostModal.jsx";




const ProfilePage = () => {
  const authUser = useSelector(selectUser);
  const navigate = useNavigate();
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [stats, setStats] = useState({ posts: 0, followers: 0, following: 0 });
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");


  const loadProfile = async () => {
    try {
      const data = await getMyProfile();
      setUserData(data.user);
      setStats(data.stats);
      setPosts(data.posts);
      setError("");
    } catch (err) {
      console.log(err);
      setError("Could not load user profile");
    }
  };

  useEffect(() => {
    if (!authUser) return;
    loadProfile();
  }, [authUser]);

  if (!userData) {
    return <p className={styles.loading}>Loading...</p>;
  }

  const { username, website, about, avatar } = userData;

  return (
    <div className={styles.wrapper}>
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.top}>
        <div className={styles.avatarBox}>
          <div className={styles.avatarRing}>
            <Avatar src={avatar} alt={`${username} avatar`} size="profile" />
          </div>
        </div>

        <div className={styles.info}>
          <div className={styles.row}>
            <h2 className={styles.name}>{username}</h2>

            <button
              className={styles.button}
              onClick={() => navigate("/profile/edit")}
            >
              Edit profile
            </button>
          </div>

          <div className={styles.rowSmall}>
            <span>
              <b>{stats.posts}</b> posts
            </span>
            <span>
              <b>{stats.followers}</b> followers
            </span>
            <span>
              <b>{stats.following}</b> following
            </span>
          </div>

          <div className={styles.bio}>
            {about && <p>{about}</p>}
            {website && (
              <a href={website} target="_blank" rel="noreferrer">
                {website}
              </a>
            )}
          </div>
        </div>
      </div>

      <div className={styles.divider} />


      {posts.length === 0 ? (
        <p className={styles.empty}>No posts yet</p>
      ) : (
        <div className={styles.postsGrid}>
          {posts.map((p) => (
            <button
              key={p._id}
              type="button"
              className={styles.postBox}
              onClick={() => setSelectedPostId(p._id)}
            >
              <img src={p.imageUrl} alt="post" className={styles.post} />
            </button>
          ))}
        </div>
      )}


      <PostModal
        isOpen={!!selectedPostId}
        postId={selectedPostId}
        onClose={() => setSelectedPostId(null)}
        onDeleted={async () => {
          setSelectedPostId(null);
          await loadProfile();
        }}
      />
    </div>
  );
};

export default ProfilePage;
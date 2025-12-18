import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./UserProfilePage.module.css";
import { getUserProfile, toggleFollow } from "../../shared/api/user-api";



const API_URL = import.meta.env.VITE_API_URL || "";
const API_ORIGIN = API_URL ? new URL(API_URL).origin : window.location.origin;
const DEFAULT_AVATAR = `${API_ORIGIN}/images/default-avatar.jpg`;

const normalizeUrl = (url) => {
  if (!url) return "";
  if (typeof url !== "string") return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/")) return `${API_ORIGIN}${url}`;
  return `${API_ORIGIN}/${url}`;
};



const UserProfilePage = () => {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [stats, setStats] = useState({ posts: 0, followers: 0, following: 0 });
  const [isFollowing, setIsFollowing] = useState(false);

  const [loading, setLoading] = useState(true);
  const [busyFollow, setBusyFollow] = useState(false);

  const load = async () => {
    const data = await getUserProfile(id);

    const u = data?.user || null;
    const s = data?.stats || { posts: 0, followers: 0, following: 0 };
    const p = Array.isArray(data?.posts) ? data.posts : [];

    setUser({
      ...u,
      avatar: normalizeUrl(u?.avatar) || DEFAULT_AVATAR,
    });
    setStats(s);
    setPosts(p);
    setIsFollowing(!!data?.isFollowing);
  };

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      try {
        setLoading(true);
        await load();
      } catch (e) {
        console.error(e);
        if (mounted) setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    if (id) run();

    return () => {
      mounted = false;
    };
  }, [id]);

  const onToggleFollow = async () => {
    if (!id || busyFollow) return;

    try {
      setBusyFollow(true);
      setIsFollowing((prev) => !prev);
      setStats((prev) => ({
        ...prev,
        followers: prev.followers + (isFollowing ? -1 : 1),
      }));

      const res = await toggleFollow(id);

      setIsFollowing(!!res?.isFollowing);
      setStats((prev) => ({
        ...prev,
        followers: typeof res?.followersCount === "number" ? res.followersCount : prev.followers,
      }));
    } catch (e) {
      console.error(e);
      setIsFollowing((prev) => !prev);
      setStats((prev) => ({
        ...prev,
        followers: prev.followers + (isFollowing ? 1 : -1),
      }));
    } finally {
      setBusyFollow(false);
    }
  };

  if (loading) return <div className={styles.wrapper}>Loading...</div>;
  if (!user) return <div className={styles.wrapper}>User not found</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles.avatarBox}>
          <img className={styles.avatar} src={user.avatar || DEFAULT_AVATAR} alt={`${user.username} avatar`} />
        </div>

        <div className={styles.info}>
          <div className={styles.row}>
            <h2 className={styles.name}>{user.username}</h2>

            <button
              className={styles.followBtn}
              type="button"
              onClick={onToggleFollow}
              disabled={busyFollow}
            >
              {isFollowing ? "Following" : "Follow"}
            </button>

            <button className={styles.messageBtn} type="button">
              Message
            </button>
          </div>

          <div className={styles.rowSmall}>
            <span><b>{stats.posts}</b> posts</span>
            <span><b>{stats.followers}</b> followers</span>
            <span><b>{stats.following}</b> following</span>
          </div>

          <div className={styles.bio}>
            {user.fullname && <p className={styles.bioTitle}>{user.fullname}</p>}
            {user.about && <p>{user.about}</p>}
            {user.website && (
              <a className={styles.link} href={user.website} target="_blank" rel="noreferrer">
                {user.website}
              </a>
            )}
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        {posts.map((p) => (
          <div key={p._id} className={styles.box}>
            <img className={styles.img} src={normalizeUrl(p.imageUrl)} alt="post" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfilePage;
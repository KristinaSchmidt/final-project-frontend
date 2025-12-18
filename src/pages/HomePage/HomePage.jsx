import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./HomePage.module.css";
import { selectUser } from "../../store/auth/authSelectors";
import { getFeedPosts } from "../../shared/api/post-api";
import PostCard from "../../shared/components/PostCard/PostCard.jsx";
import PostModal from "../../shared/components/PostModal/PostModal.jsx";



const HomePage = () => {
  const authUser = useSelector(selectUser);
  const authUserId = authUser?._id;

  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadFeed = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getFeedPosts(1, 20);
      const list = Array.isArray(data) ? data : data?.posts || [];
      setPosts(list);
    } catch (e) {
      console.log(e);
      setError("Could not load feed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeed();
  }, []);

  return (
    <>
      <div className={styles.feed}>
        {loading && <p className={styles.info}>Loading…</p>}
        {error && <p className={styles.error}>{error}</p>}

        {posts.map((p) => (
          <PostCard
            key={p._id}
            post={p}
            authUserId={authUserId}
            onOpenPost={(id) => setSelectedPostId(id)}
          />
        ))}

        {!loading && !error && posts.length === 0 && (
          <p className={styles.info}>No posts yet</p>
        )}
      </div>

      <PostModal
        isOpen={!!selectedPostId}
        postId={selectedPostId}
        onClose={() => setSelectedPostId(null)}
        onDeleted={async () => {
          setSelectedPostId(null);
          await loadFeed();
        }}
      />
    </>
  );
};

export default HomePage;
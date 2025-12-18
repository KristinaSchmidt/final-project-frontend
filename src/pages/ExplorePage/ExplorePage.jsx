import { useEffect, useMemo, useState } from "react";
import styles from "./ExplorePage.module.css";
import instance from "../../shared/api/instance";
import PostModal from "../../shared/components/PostModal/PostModal";


const API_URL = import.meta.env.VITE_API_URL || "";
const API_ORIGIN = API_URL ? new URL(API_URL).origin : window.location.origin;

const toAbs = (url) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${API_ORIGIN}${url.startsWith("/") ? "" : "/"}${url}`;
};

const mixList = (arr) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};




const ExplorePage = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [activePostId, setActivePostId] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);


        const res = await instance.get("/posts/explore");
        const posts = Array.isArray(res.data) ? res.data : res.data?.posts || [];


        setList(mixList(posts));
      } catch (e) {
        console.error("Explore error:", e);
        setList([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  useEffect(() => {
  const load = async () => {
    try {
      const res = await instance.get("/posts/explore", {
        params: { page: 1, limit: 30 },
      });

      const posts = res.data?.posts ?? res.data ?? [];
      setList(posts);
    } catch (e) {
      console.error("Explore error:", e);
      setList([]);
    } finally {
      setLoading(false);
    }
  };

  load();
}, []);

  const openPost = (postId) => {
    if (!postId) return;
    setActivePostId(postId);
    setIsOpen(true);
  };

  const closePost = () => {
    setIsOpen(false);
    setActivePostId(null);
  };


  const items = useMemo(
    () =>
      list
        .map((p) => ({
          id: p._id || p.id,
          src: toAbs(p.image || p.imageUrl || p.photo || p.src),
        }))
        .filter((x) => x.id && x.src),
    [list]
  );

  return (
    <div className={styles.wrapper}>
      {loading && <p className={styles.text}>Loading...</p>}

      {!loading && items.length === 0 && (
        <p className={styles.text}>No photos yet</p>
      )}

      {!loading && items.length > 0 && (
        <div className={styles.grid}>
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              className={styles.box}
              onClick={() => openPost(item.id)}
              aria-label="Open post"
            >
              <img className={styles.img} src={item.src} alt="post" />
            </button>
          ))}
        </div>
      )}


      <PostModal isOpen={isOpen} onClose={closePost} postId={activePostId} />
    </div>
  );
};

export default ExplorePage;
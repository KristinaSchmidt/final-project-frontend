import { useEffect, useState } from "react";
import styles from "./ExplorePage.module.css";

// kleine Hilfsfunktion: mischt ein Array
const mixList = (arr) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const ExplorePage = () => {
  const [list, setList] = useState([]);       // Bilder/Posts
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // 🔹 später: echte Daten vom Backend
        // const res = await fetch("/api/posts/explore");
        // const data = await res.json();
        // const posts = data.posts ?? data;
        // setList(mixList(posts));

        // 🔹 jetzt: Demo-Bilder (nur Platzhalter)
        const demo = [
          {
            id: 1,
            src: "https://images.pexels.com/photos/210182/pexels-photo-210182.jpeg",
            alt: "photo 1",
          },
          {
            id: 2,
            src: "https://images.pexels.com/photos/2100063/pexels-photo-2100063.jpeg",
            alt: "photo 2",
          },
          {
            id: 3,
            src: "https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg",
            alt: "photo 3",
          },
          {
            id: 4,
            src: "https://images.pexels.com/photos/247477/pexels-photo-247477.jpeg",
            alt: "photo 4",
          },
          {
            id: 5,
            src: "https://images.pexels.com/photos/208636/pexels-photo-208636.jpeg",
            alt: "photo 5",
          },
          {
            id: 6,
            src: "https://images.pexels.com/photos/1563355/pexels-photo-1563355.jpeg",
            alt: "photo 6",
          },
          {
            id: 7,
            src: "https://images.pexels.com/photos/3806439/pexels-photo-3806439.jpeg",
            alt: "photo 7",
          },
          {
            id: 8,
            src: "https://images.pexels.com/photos/1181539/pexels-photo-1181539.jpeg",
            alt: "photo 8",
          },
          {
            id: 9,
            src: "https://images.pexels.com/photos/712876/pexels-photo-712876.jpeg",
            alt: "photo 9",
          },
        ];

        setList(mixList(demo)); // 🔁 zufällige Reihenfolge
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className={styles.wrapper}>
      {loading && <p className={styles.text}>Loading...</p>}

      {!loading && list.length === 0 && (
        <p className={styles.text}>No photos yet</p>
      )}

      {!loading && list.length > 0 && (
        <div className={styles.grid}>
          {list.map((item) => (
            <div key={item.id} className={styles.box}>
              <img
                className={styles.img}
                src={item.src}
                alt={item.alt || "post"}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExplorePage;
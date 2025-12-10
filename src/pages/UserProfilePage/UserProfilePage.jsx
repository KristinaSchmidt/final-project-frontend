import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./UserProfilePage.module.css";

const UserProfilePage = () => {
  const { id } = useParams(); // z.B. /user/123
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // 🔹 später: echte Daten vom Backend holen, z.B.:
    // const token = localStorage.getItem("token");
    // const userRes = await fetch(`/api/users/${id}`, { headers: { Authorization: `Bearer ${token}` }});
    // const userData = await userRes.json();
    // setUser(userData);
    //
    // const postRes = await fetch(`/api/posts/user/${id}`, { headers: {...} });
    // const postData = await postRes.json();
    // setPosts(postData);

    // jetzt: Demo-Daten
    const demoUser = {
      id,
      name: "itcareerhub",
      avatar:
        "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg",
      postsCount: 129,
      followersCount: 9990,
      followingCount: 59,
      title: "IT Career Hub",
      bio: "- Гарантия помощи с трудоустройством в ведущие IT-компании\n- Выпускники зарабатывают от 45k евро\nБЕСПЛАТНАЯ",
      link: "https://bit.ly/3rpIlbh",
    };

    const demoPosts = [
      {
        id: 1,
        src: "https://images.pexels.com/photos/2100063/pexels-photo-2100063.jpeg",
        alt: "post 1",
      },
      {
        id: 2,
        src: "https://images.pexels.com/photos/1181539/pexels-photo-1181539.jpeg",
        alt: "post 2",
      },
      {
        id: 3,
        src: "https://images.pexels.com/photos/208636/pexels-photo-208636.jpeg",
        alt: "post 3",
      },
      {
        id: 4,
        src: "https://images.pexels.com/photos/1563355/pexels-photo-1563355.jpeg",
        alt: "post 4",
      },
      {
        id: 5,
        src: "https://images.pexels.com/photos/712876/pexels-photo-712876.jpeg",
        alt: "post 5",
      },
      {
        id: 6,
        src: "https://images.pexels.com/photos/3806439/pexels-photo-3806439.jpeg",
        alt: "post 6",
      },
    ];

    setUser(demoUser);
    setPosts(demoPosts);
  }, [id]);

  if (!user) {
    return <div className={styles.wrapper}>Loading...</div>;
  }

  return (
    <div className={styles.wrapper}>
      {/* Kopfbereich mit Avatar + Infos + Buttons */}
      <div className={styles.top}>
        <div className={styles.avatarBox}>
          <img
            className={styles.avatar}
            src={user.avatar}
            alt={`${user.name} avatar`}
          />
        </div>

        <div className={styles.info}>
          {/* erste Reihe: Name + Buttons */}
          <div className={styles.row}>
            <h2 className={styles.name}>{user.name}</h2>

            <button className={styles.followBtn}>Follow</button>
            <button className={styles.messageBtn}>Message</button>
          </div>

          {/* zweite Reihe: Stats */}
          <div className={styles.rowSmall}>
            <span>
              <b>{user.postsCount}</b> posts
            </span>
            <span>
              <b>{user.followersCount}</b> followers
            </span>
            <span>
              <b>{user.followingCount}</b> following
            </span>
          </div>

          {/* dritte Reihe: Bio */}
          <div className={styles.bio}>
            <p className={styles.bioTitle}>{user.title}</p>
            {user.bio.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
            <a
              className={styles.link}
              href={user.link}
              target="_blank"
              rel="noreferrer"
            >
              {user.link}
            </a>
          </div>
        </div>
      </div>

      {/* Grid mit Posts */}
      <div className={styles.grid}>
        {posts.map((item) => (
          <div key={item.id} className={styles.box}>
            <img className={styles.img} src={item.src} alt={item.alt} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfilePage;
import { useState } from "react";
import styles from './style/facebook.module.scss';
import Dabopage from "../dashboard/dabopage";

export default function FacebookFeed({ posts = [], user }) {
  // Példa: user = { name: "John Doe", avatar: "https://..." }
  // posts = [{ id, text, image, createdAt }, ...]
  const [loggedIn, setLoggedIn] = useState(!!user);

  const handleLogout = () => {
    // Ide jönne az Auth logout logika
    setLoggedIn(false);
  };

  if (!loggedIn) {
    return (
      <div className={styles.feedContainer}>
        <div className={styles.header}>Facebook</div>
        <div className={styles.loginInfo}>
          <span>Jelentkezz be Facebookkal az AI feedhez!</span>
          {/* Ide jöhet a LoginButton komponens */}
        </div>
        <div className={styles.loginInfo}>
          <Dabopage platform="facebook" />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.feedContainer}>
      <div className={styles.header}>
        Facebook
        <div className={styles.userInfo}>
          <img src={user?.avatar} alt="avatar" className={styles.avatar} />
          <span>{user?.name}</span>
          <button onClick={handleLogout}>Kijelentkezés</button>
        </div>
      </div>
      {posts.length === 0 ? (
        <div className={styles.noPosts}>Nincs még generált poszt.</div>
      ) : (
        posts.map(post => (
          <div className={styles.post} key={post.id}>
            <div className={styles.avatar}>
              <img src={user?.avatar} alt="avatar" />
            </div>
            <div className={styles.content}>
              <div className={styles.username}>{user?.name}</div>
              <div className={styles.text}>{post.text}</div>
              {post.image && <img src={post.image} alt="post" className={styles.postImage} />}
              <div className={styles.date}>{new Date(post.createdAt).toLocaleString()}</div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
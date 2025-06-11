import { useState } from "react";
import styles from './style/instagram.module.scss';
import Dabopage from "../dashboard/dabopage";

export default function InstagramFeed({ posts = [], user }) {
  // user = { name: "AI User", avatar: "https://..." }
  // posts = [{ id, text, image, createdAt }, ...]
  const [loggedIn, setLoggedIn] = useState(!!user);

  const handleLogout = () => {
    setLoggedIn(false);
  };

  if (!loggedIn) {
    return (
      <div className={styles.feedContainer}>
        <div className={styles.header}>Instagram</div>
        <div className={styles.loginInfo}>
          <span>Jelentkezz be Instagrammal az AI feedhez!</span>
        </div>
        <div className={styles.loginInfo}>
          <Dabopage platform="instagram" />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.feedContainer}>
      <div className={styles.header}>
        Instagram
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
            {post.image && (
              <div className={styles.image}>
                <img src={post.image} alt="post" />
              </div>
            )}
            <div className={styles.caption}>{post.text}</div>
            <div className={styles.date}>{new Date(post.createdAt).toLocaleString()}</div>
          </div>
        ))
      )}
    </div>
  );
}
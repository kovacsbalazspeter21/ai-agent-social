import { useState } from "react";
import styles from './style/threads.module.scss';

export default function ThreadsFeed({ posts = [], user }) {
  // user = { name: "AI User", avatar: "https://..." }
  // posts = [{ id, text, image, createdAt }, ...]
  const [loggedIn, setLoggedIn] = useState(!!user);

  const handleLogout = () => {
    setLoggedIn(false);
  };

  if (!loggedIn) {
    return (
      <div className={styles.feedContainer}>
        <div className={styles.header}>Threads</div>
        <div className={styles.loginInfo}>
          <span>Jelentkezz be Threads-fiókkal az AI feedhez!</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.feedContainer}>
      <div className={styles.header}>
        Threads
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
            <div className={styles.text}>{post.text}</div>
            {post.image && (
              <div className={styles.image}>
                <img src={post.image} alt="post" />
              </div>
            )}
            <div className={styles.date}>{new Date(post.createdAt).toLocaleString()}</div>
          </div>
        ))
      )}
    </div>
  );
}
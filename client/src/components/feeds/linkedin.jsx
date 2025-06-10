import { useState } from "react";
import styles from './style/linkedin.module.scss';

export default function LinkedinFeed({ posts = [], user }) {
  // user = { name: "AI User", avatar: "https://..." }
  // posts = [{ id, text, image, createdAt }, ...]
  const [loggedIn, setLoggedIn] = useState(!!user);

  const handleLogout = () => {
    // Ide jönne az Auth logout logika
    setLoggedIn(false);
  };

  if (!loggedIn) {
    return (
      <div className={styles.feedContainer}>
        <div className={styles.header}>LinkedIn</div>
        <div className={styles.loginInfo}>
          <span>Jelentkezz be LinkedIn-nel az AI feedhez!</span>
          {/* Ide jöhet a LoginButton komponens */}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.feedContainer}>
      <div className={styles.header}>
        LinkedIn
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
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div className={styles.avatar}>
                <img src={user?.avatar} alt="avatar" style={{ width: 40, height: 40, borderRadius: "50%" }} />
              </div>
              <div>
                <div className={styles.username}>{user?.name}</div>
                {/* <div className={styles.position}>Pozíció vagy cégnév</div> */}
              </div>
            </div>
            <div className={styles.text}>{post.text}</div>
            {post.image && (
              <img src={post.image} alt="post" style={{ maxWidth: "100%", borderRadius: 8, margin: "8px 0" }} />
            )}
            <div className={styles.date}>{new Date(post.createdAt).toLocaleString()}</div>
          </div>
        ))
      )}
    </div>
  );
}
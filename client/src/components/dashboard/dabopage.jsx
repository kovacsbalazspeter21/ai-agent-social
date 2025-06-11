import { useState, useEffect } from "react";
import styles from "./dashboard.module.scss"; // minden platformhoz legyenek színek/stílusok

export default function Dashboard({ platform }) {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState({}); // { [postId]: true/false }

  useEffect(() => {
    fetch("http://localhost:8000/posts")
      .then(res => res.json())
      .then(setPosts);
  }, []);

  // Csak az aktuális platform posztjai
  const filtered = posts.filter(p => p.platform === platform);

  return (
    <div className={styles.dashboard}>
      <h2>{platform.charAt(0).toUpperCase() + platform.slice(1)} posztok</h2>
      {filtered.length === 0 && <div>Nincs még mentett poszt.</div>}
      {filtered.map(post => (
        <div
          key={post.id}
          className={`${styles.post} ${styles[platform]}`}
        >
          <div
            className={styles.header}
            onClick={() => setOpen(o => ({ ...o, [post.id]: !o[post.id] }))}
            style={{ cursor: "pointer" }}
          >
            <span>{new Date(post.created_at).toLocaleString()}</span>
            <span>{open[post.id] ? "▲" : "▼"}</span>
          </div>
          {open[post.id] && (
            <div className={styles.body}>
              <div className={styles.text}>{post.content}</div>
              {post.images && post.images.map((img, i) => (
                <img key={i} src={img} alt="AI" className={styles.image} />
              ))}
              {post.videos && post.videos.map((vid, i) => (
                <video key={i} src={vid} controls className={styles.video} />
              ))}
              {post.links && post.links.length > 0 && (
                <ul>
                  {post.links.map((l, i) => (
                    <li key={i}><a href={l} target="_blank" rel="noopener noreferrer">{l}</a></li>
                  ))}
                </ul>
              )}
              {/* stb. */}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
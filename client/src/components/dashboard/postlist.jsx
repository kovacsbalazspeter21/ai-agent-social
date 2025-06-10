import { useEffect, useState } from "react";

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/posts")
      .then(res => res.json())
      .then(setPosts);
  }, []);

  return (
    <div>
      <h2>Publikált posztok</h2>
      {posts.map(post => (
        <div key={post.id} style={{ border: "1px solid #ccc", margin: 8, padding: 8 }}>
          <div><b>Platform:</b> {post.platform}</div>
          <div><b>Szöveg:</b> {post.content}</div>
          {post.images && post.images.length > 0 && (
            <div>
              <b>Képek:</b>
              {post.images.map((img, i) => (
                <img key={i} src={img} alt="AI kép" style={{ maxWidth: 100, margin: 4 }} />
              ))}
            </div>
          )}
          {post.videos && post.videos.length > 0 && (
            <div>
              <b>Videók:</b>
              {post.videos.map((vid, i) => (
                <video key={i} src={vid} controls style={{ maxWidth: 150, margin: 4 }} />
              ))}
            </div>
          )}
          {post.files && post.files.length > 0 && (
            <div>
              <b>Fájlok:</b>
              <ul>
                {post.files.map((f, i) => (
                  <li key={i}><a href={f} target="_blank" rel="noopener noreferrer">{f}</a></li>
                ))}
              </ul>
            </div>
          )}
          {post.links && post.links.length > 0 && (
            <div>
              <b>Linkek:</b>
              <ul>
                {post.links.map((l, i) => (
                  <li key={i}><a href={l} target="_blank" rel="noopener noreferrer">{l}</a></li>
                ))}
              </ul>
            </div>
          )}
          {post.scheduled_time && (
            <div><b>Időzítés:</b> {post.scheduled_time}</div>
          )}
        </div>
      ))}
    </div>
  );
}
import { useState } from "react";
import styles from "./aiform.module.scss";
import LoginButton from "../LoginButton";

export default function PlatformView({ platform }) {
  const [prompt, setPrompt] = useState("");
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  // Média
  const [aiImages, setAiImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [aiVideos, setAiVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [links, setLinks] = useState([]);
  const [scheduled, setScheduled] = useState("");

  // AI szöveg generálás
  const handleGenerate = async () => {
  setLoading(true);
  setOptions([]);
  setSelected(null);
  try {
    const res = await fetch("http://localhost:8000/generate-post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ platform, prompt }),
    });
    if (!res.ok) throw new Error("Szerverhiba!");
    const data = await res.json();
    setOptions(data.options || []);
  } catch (err) {
    alert("Hiba történt a generálás során: " + err.message);
  }
  setLoading(false);
};

  // AI kép generálás (több kép támogatás)
  const handleImageGen = async () => {
    const formData = new FormData();
    formData.append("prompt", prompt);
    const res = await fetch("http://localhost:8000/generate-image", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setAiImages((prev) => [...prev, data.image_url]);
  };

  // AI videó generálás (több videó támogatás)
  const handleVideoGen = async () => {
    const formData = new FormData();
    formData.append("prompt", prompt);
    const res = await fetch("http://localhost:8000/generate-video", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setAiVideos((prev) => [...prev, data.video_url]);
  };

  // Fájl feltöltés
  const handleFileChange = async (e) => {
    const filesArr = Array.from(e.target.files);
    setFiles(filesArr);
    // Feltöltés szerverre
    const uploaded = [];
    for (const file of filesArr) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("http://localhost:8000/upload-file", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      uploaded.push(data.url);
    }
    setUploadedFiles(uploaded);
  };

  // Link hozzáadás
  const handleAddLink = (e) => {
    e.preventDefault();
    const link = e.target.link.value;
    if (link) setLinks([...links, link]);
    e.target.reset();
  };

  // Poszt publikálása
  const handlePublish = async () => {
    const formData = new FormData();
    formData.append("platform", platform);
    formData.append("prompt", prompt);
    formData.append("content", options[selected]?.text || "");
    // Kiválasztott AI poszt kép
    if (options[selected]?.image) {
      formData.append("images", JSON.stringify([options[selected].image]));
    }
    // Kiválasztott AI kép
    if (selectedImage) {
      formData.append("images", JSON.stringify([selectedImage]));
    }
    // Kiválasztott AI videó
    if (selectedVideo) {
      formData.append("videos", JSON.stringify([selectedVideo]));
    }
    formData.append("files", JSON.stringify(uploadedFiles));
    formData.append("links", JSON.stringify(links));
    formData.append("scheduled_time", scheduled);

    await fetch("http://localhost:8000/create-post", {
      method: "POST",
      body: formData,
    });
    alert("Poszt publikálva!");
    // Reset state
    setPrompt("");
    setOptions([]);
    setSelected(null);
    setFiles([]);
    setUploadedFiles([]);
    setLinks([]);
    setAiImages([]);
    setSelectedImage(null);
    setAiVideos([]);
    setSelectedVideo(null);
    setScheduled("");
  };

  // AI poszt szerkesztő
  const handleEditOption = (e) => {
    const newOptions = [...options];
    newOptions[selected].text = e.target.value;
    setOptions(newOptions);
  };

  return (
    <div className={`${styles.container} ${styles[platform]}`}>
      <LoginButton platform={platform} />
      <div className={styles.content}>
        <h1>Generálj posztot {platform.charAt(0).toUpperCase() + platform.slice(1)}-ra!</h1>
        <textarea
          placeholder="Írd ide a poszt ötletét..."
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
        />
        <button onClick={handleGenerate} disabled={loading}>
          {loading ? "Generálás..." : "Generálás AI-val"}
        </button>

        {/* AI opciók választása */}
        {options.length > 0 && (
          <div className={styles.options}>
            <h3>Válassz egy AI által generált posztot:</h3>
            {options.map((opt, i) => (
              <div key={i} className={styles.optionBox} style={{ margin: "16px 0", border: "1px solid #ccc", padding: 8 }}>
                <input
                  type="radio"
                  name="aioption"
                  checked={selected === i}
                  onChange={() => setSelected(i)}
                />
                <span style={{ marginLeft: 8 }}>{opt.text}</span>
                <br />
                {opt.image && <img src={opt.image} alt="AI kép" style={{ maxWidth: 200, display: "block" }} />}
              </div>
            ))}
          </div>
        )}

        {/* Szerkesztő, média generálás és feltöltés */}
        {selected !== null && (
          <>
            <h3>Poszt szöveg szerkesztése:</h3>
            <textarea
              value={options[selected]?.text || ""}
              onChange={handleEditOption}
              style={{ width: "100%", minHeight: 80 }}
            />

            <h3>AI kép generálás:</h3>
            <button onClick={handleImageGen}>AI kép generálása</button>
            {aiImages.length > 0 && (
              <div className={styles.mediaSelector}>
                <h4>Válassz AI képet:</h4>
                {aiImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="AI"
                    style={{
                      border: selectedImage === img ? "2px solid blue" : "1px solid #ccc",
                      maxWidth: 100,
                      cursor: "pointer",
                      margin: 4,
                    }}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>
            )}

            <h3>AI videó generálás:</h3>
            <button onClick={handleVideoGen}>AI videó generálása</button>
            {aiVideos.length > 0 && (
              <div className={styles.mediaSelector}>
                <h4>Válassz AI videót:</h4>
                {aiVideos.map((vid, i) => (
                  <video
                    key={i}
                    src={vid}
                    controls
                    style={{
                      border: selectedVideo === vid ? "2px solid blue" : "1px solid #ccc",
                      maxWidth: 150,
                      cursor: "pointer",
                      margin: 4,
                      display: "inline-block"
                    }}
                    onClick={() => setSelectedVideo(vid)}
                  />
                ))}
              </div>
            )}

            <h3>Fájl(ok) feltöltése:</h3>
            <input type="file" multiple onChange={handleFileChange} />
            <ul>
              {uploadedFiles.map((url, i) => (
                <li key={i}><a href={url} target="_blank" rel="noopener noreferrer">{url}</a></li>
              ))}
            </ul>

            <h3>Link(ek) hozzáadása:</h3>
            <form onSubmit={handleAddLink}>
              <input name="link" type="url" placeholder="https://példa.hu" />
              <button type="submit">Hozzáadás</button>
            </form>
            <ul>
              {links.map((l, i) => <li key={i}>{l}</li>)}
            </ul>

            <h3>Időzítés (opcionális):</h3>
            <input
              type="datetime-local"
              value={scheduled}
              onChange={e => setScheduled(e.target.value)}
            />

            <button onClick={handlePublish} style={{ marginTop: 16 }} disabled={selected === null}>
              Poszt publikálása
            </button>
          </>
        )}
      </div>
    </div>
  );
}
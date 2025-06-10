import style from "./sidebar.module.scss";
/*
import facebookLogo from "./images/facebook-logo.png";
import instagramLogo from "./images/instagram-logo.png";
import threadsLogo from "./images/threads-logo.png";
import xLogo from "./images/x-logo.png";
import linkedinLogo from "./images/linkedin-logo.png";
*/

const platforms = ["facebook", "instagram", "threads", "x", "linkedin"];
/*
const logos = {
  facebook: facebookLogo,
  instagram: instagramLogo,
  threads: threadsLogo,
  x: xLogo,
  linkedin: linkedinLogo,
};
*/
export default function Sidebar({ selected, onSelect }) {
  return (
    <div style={{ width: 180, padding: 16, borderRight: "1px solid #eee" }}>
      {platforms.map((p) => (
        <button
          key={p}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: "16px 0",
            fontWeight: selected === p ? "bold" : "normal",
            background: "none",
            border: "2px solid",
            borderColor: selected === p ? "#007bff" : "#ccc",
            borderRadius: 10,
            cursor: "pointer",
            padding: "16px 0 8px 0",
            width: "100%",
            transition: "border 0.2s",
            outline: selected === p ? "2px solid #007bff" : "none",
          }}
          onClick={() => onSelect(p)}
        >
          <img
            src={`/images/${p}-logo.png`}
            alt={p}
            style={{
              width: 36,
              height: 36,
              marginBottom: 8,
              filter: selected === p ? "none" : "grayscale(60%)",
            }}
          />
          <span style={{ fontSize: 16 }}>
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </span>
        </button>
      ))}
    </div>
  );
}
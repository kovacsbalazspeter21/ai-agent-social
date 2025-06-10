import PlatformView from "../components/generate/aiform";
import PostList from "./postlist";

export default function Dashboard() {
  // platform state-tel bővítsd, ha több platformot kezelsz!
  return (
    <div style={{ display: "flex", gap: 32 }}>
      <div style={{ flex: 1 }}>
        <PlatformView platform="facebook" />
        <PlatformView platform="instagram" />
        <PlatformView platform="threads" />
        <PlatformView platform="x" />
        <PlatformView platform="linkedin" />
      </div>
      <div style={{ flex: 1 }}>
        <PostList />
      </div>
    </div>
  );
}
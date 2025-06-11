import Dabopage from "../dashboard/dabopage";
import PostList from "./postlist";

export default function Dashboard() {
  // platform state-tel bővítsd, ha több platformot kezelsz!
  return (
    <div style={{ display: "flex", gap: 32 }}>
      <div style={{ flex: 1 }}>
        <Dabopage platform="facebook" />
        <Dabopage platform="instagram" />
        <Dabopage platform="threads" />
        <Dabopage platform="x" />
        <Dabopage platform="linkedin" />
      </div>
      <div style={{ flex: 1 }}>
        <PostList />
      </div>
    </div>
  );
}
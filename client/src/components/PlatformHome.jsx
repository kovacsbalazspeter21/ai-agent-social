import Facebook from "./feeds/facebook";
import Instagram from "./feeds/instagram";
import Threads from "./feeds/threads";
import X from "./feeds/x";
import LinkedIn from "./feeds/linkedin";

export default function PlatformHome({ platform }) {
  switch (platform) {
    case "facebook":
      return <div>Facebook bemutató vagy dashboard itt.
        <Facebook />
      </div>;
    case "instagram":
      return <div>Instagram bemutató vagy dashboard itt.
        <Instagram />
      </div>;
    case "threads":
      return <div>Threads bemutató vagy dashboard itt.
        <Threads />
      </div>;
    case "x":
      return <div>X bemutató vagy dashboard itt.
        <X />
      </div>;
    case "linkedin":
      return <div>LinkedIn bemutató vagy dashboard itt.
        <LinkedIn />
      </div>;
    // stb.
    default:
      return <div>Válassz platformot!</div>;
  }
}
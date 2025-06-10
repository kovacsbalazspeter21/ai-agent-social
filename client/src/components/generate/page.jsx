'use client';
import { useState } from "react";
import Sidebar from "../sidebar";
import PlatformView from "./aiform";
import PlatformHome from "../PlatformHome"; // platform homepage komponens

const platforms = ["facebook", "instagram", "threads", "x", "linkedin"];

export default function PostGeneratorPage() {
  const [selectedPlatform, setSelectedPlatform] = useState("facebook");

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar
        platforms={platforms}
        selected={selectedPlatform}
        onSelect={setSelectedPlatform}
      />
      <PlatformHome platform={selectedPlatform} />
      <PlatformView platform={selectedPlatform} />
    </div>
  );
}

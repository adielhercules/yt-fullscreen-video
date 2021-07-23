import React, { useState } from "react";
import NavBar from "./NavBar";
import Video from "./Video";

export default function App() {
  const [videoId, setVideoId] = useState("RkC0l4iekYo");
  return (
    <div className="fixed top-0 left-0 w-full h-full flex flex-col">
      <NavBar setVideoId={setVideoId} />
      <Video videoId={videoId} />
    </div>
  );
}

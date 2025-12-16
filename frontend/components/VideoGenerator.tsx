"use client";
import React, { useState } from "react";
import { generateVideo } from "../services/api";

type Props = {
  audioPath: string;
  images: string[];
  avatar?: File | null;
};

export default function VideoGenerator({ audioPath, images, avatar }: Props) {
  const [loading, setLoading] = useState(false);
  const [videoPath, setVideoPath] = useState("");

  async function handleGenerate() {
    setLoading(true);
    try {
      const data = await generateVideo({ audioPath, images, avatar });
      setVideoPath(data.videoPath);
    } catch (err: any) {
      alert("Error generando video: " + (err?.message || ""));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h3>Video final</h3>

      <button onClick={handleGenerate} disabled={loading}>
        Generar video
      </button>

      {loading && <p>Generando video, esto puede tardar...</p>}

      {videoPath && (
        <video
          controls
          src={`http://localhost:8000/${videoPath}`}
          style={{ width: "100%", marginTop: 10 }}
        />
      )}
    </div>
  );
}
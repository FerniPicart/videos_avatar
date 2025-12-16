"use client";
import React, { useState } from "react";
import { generateImages } from "../services/api";

type Props = {
  avatar: File | null;
  topic: string;
  script: string;
  onGenerated: (images: string[]) => void;
};

export default function ImageGenerator({ avatar, topic, script, onGenerated }: Props) {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  async function handleGenerate() {
    setLoading(true);
    try {
      const data = await generateImages(avatar, topic, script, "Ilustración estilo avatar educativo");
      setImages(data.images);
      onGenerated(data.images);
    } catch (err: any) {
      alert("Error generando imágenes: " + (err?.message || ""));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h3>Imágenes</h3>

      <button onClick={handleGenerate} disabled={loading || !script}>
        Generar imágenes
      </button>

      {loading && (
        <p>Generando imágenes con IA. Esto puede tardar algunos minutos...</p>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 10 }}>
        {images.map((img, i) => (
          <img
            key={i}
            src={`http://localhost:8000/${img}`}
            style={{ width: "100%", borderRadius: 6 }}
          />
        ))}
      </div>
    </div>
  );
}
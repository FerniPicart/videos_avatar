"use client";

import { useState } from "react";
import AvatarUploader from "@/components/AvatarUploader";
import ScriptGenerator from "@/components/ScriptGenerator";
import AudioGenerator from "@/components/AudioGenerator";
import ImageGenerator from "@/components/ImageGenerator";
import VideoGenerator from "@/components/VideoGenerator";

export default function Home() {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [topic, setTopic] = useState("");
  const [script, setScript] = useState("");
  const [audioPath, setAudioPath] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const canGenerateVideo = audioPath && images.length > 0;

  return (
    <main style={{ maxWidth: 800, margin: "auto", padding: "2rem" }}>
      <h1>Generador de videos con IA</h1>

      <section>
        <h2>1. Avatar</h2>
        <AvatarUploader onUpload={setAvatar} />
      </section>

      <section>
        <h2>2. Tema del video</h2>
        <input
          placeholder="Ej: Explicar cómo funciona la IA"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          style={{ width: "100%", padding: "0.5rem" }}
        />
      </section>

      <section>
        <h2>3. Guion</h2>
        <ScriptGenerator script={script} setScript={setScript} />
      </section>

      {script && (
        <section>
          <h2>4. Audio</h2>
          <AudioGenerator script={script} onGenerated={setAudioPath} />
          {audioPath && <p>✅ Audio generado</p>}
        </section>
      )}

      {topic && script && (
        <section>
          <h2>5. Imágenes</h2>
          <ImageGenerator
            topic={topic}
            script={script}
            onGenerated={setImages}
          />
          {images.length > 0 && <p>✅ {images.length} imágenes generadas</p>}
        </section>
      )}

      {canGenerateVideo && (
        <section>
          <h2>6. Video final</h2>
          <VideoGenerator audioPath={audioPath} images={images} />
        </section>
      )}
    </main>
  );
}

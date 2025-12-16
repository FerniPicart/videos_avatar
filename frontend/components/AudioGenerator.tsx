"use client";
import React, { useState } from "react";
import { generateAudio } from "../services/api";

type Props = {
  script: string;
  onGenerated: (audioPath: string) => void;
};

export default function AudioGenerator({ script, onGenerated }: Props) {
  const [voice, setVoice] = useState("ar_female");
  const [audioPath, setAudioPath] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    try {
      const data = await generateAudio(script, voice);
      setAudioPath(data.audioPath);
      onGenerated(data.audioPath);
    } catch (err: any) {
      alert("Error generando audio: " + (err?.message || ""));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h3>Audio</h3>

      <select value={voice} onChange={(e) => setVoice(e.target.value)}>
        <option value="ar_female">Argentina - Femenina</option>
        <option value="es_male">España - Masculina</option>
        <option value="mx_male">México - Masculina</option>
      </select>

      <br />

      <button onClick={handleGenerate} disabled={loading || !script}>
        Generar audio
      </button>

      {loading && <p>Generando audio...</p>}

      {audioPath && (
        <audio controls src={`http://localhost:8000/${audioPath}`} />
      )}
    </div>
  );
}
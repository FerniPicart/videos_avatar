"use client";
import React, { useState, useEffect } from "react";
import { generateScript } from "../services/api";
import Loader from "./Loader";

type Props = {
  topic: string;
  setTopic: (t: string) => void;
  script: string;
  setScript: (s: string) => void;
};

export default function ScriptGenerator({ topic, setTopic, script, setScript }: Props) {
  const [tone, setTone] = useState("neutral");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canGenerate = topic.trim().length > 3;

  async function handleGenerate() {
    setError(null);
    setLoading(true);
    try {
      const res = await generateScript(topic, tone);
      setScript(res.script);
    } catch (err: any) {
      setError(err?.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h3>2. Tema del video</h3>
      <input
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Ej: Explicar como funciona la IA generativa"
        style={{ width: "100%", padding: 8 }}
      />
      <div style={{ marginTop: 8 }}>
        <label>Tono:</label>
        <select value={tone} onChange={(e) => setTone(e.target.value)}>
          <option value="neutral">Neutro</option>
          <option value="entusiasta">Entusiasta</option>
          <option value="formal">Formal</option>
        </select>
      </div>

      <div style={{ marginTop: 12 }}>
        <button onClick={handleGenerate} disabled={!canGenerate || loading}>
          {loading ? "Generando..." : "Generar guion"}
        </button>
        {loading && <Loader message="Generando guion con IA..." small />}
      </div>

      <div style={{ marginTop: 16 }}>
        <h3>3. Guion</h3>
        <textarea
          value={script}
          onChange={(e) => setScript(e.target.value)}
          rows={10}
          style={{ width: "100%" }}
        />
      </div>

      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}
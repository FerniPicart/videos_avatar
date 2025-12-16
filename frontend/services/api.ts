const API_URL = "http://localhost:8000";

type Maybe<T> = T | null;

function normalizeAudioPath(data: any): string {
  // soporta varias formas de respuesta del backend
  return data.audio_path || data.audioPath || data.audioUrl || data.url || "";
}

function normalizeImages(data: any): string[] {
  return data.images || data.image_paths || data.imagePaths || [];
}

function normalizeVideoPath(data: any): string {
  return data.video_path || data.videoPath || data.videoUrl || data.url || "";
}

export async function generateScript(topic: string, tone = "neutral") {
  const payload = { topic, tone };
  const res = await fetch(`${API_URL}/generate-script`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Error generating script");
  }

  const json = await res.json();
  return { script: json.script as string };
}

export async function generateAudio(script: string, voice = "default") {
  const res = await fetch(`${API_URL}/generate-audio`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ script, voice }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Error generating audio");
  }
  const json = await res.json();
  const audioPath = normalizeAudioPath(json);
  return { audioPath };
}

/**
 * generateImages acepta dos modos:
 * - Si le pasas un FormData ya preparado (primer arg instance of FormData), lo usa.
 * - Si le pasas (avatar: File | null, topic: string, script: string, prompt?: string) construye FormData.
 */
export async function generateImages(
  avatarOrFormData: FormData | File | null,
  topic?: string,
  script?: string,
  prompt?: string
) {
  let formData: FormData;
  if (avatarOrFormData instanceof FormData) {
    formData = avatarOrFormData;
  } else {
    formData = new FormData();
    if (avatarOrFormData) formData.append("avatar", avatarOrFormData);
    if (topic) formData.append("topic", topic);
    if (script) formData.append("script", script);
    if (prompt) formData.append("prompt", prompt || "");
  }

  const res = await fetch(`${API_URL}/generate-images`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Error generating images");
  }

  const json = await res.json();
  const images = normalizeImages(json);
  return { images };
}

/**
 * generateVideo:
 * - Se recomienda enviar audio path (o file) + images[] + avatar opcional.
 */
export async function generateVideo({
  audioPath,
  images,
  avatar,
}: {
  audioPath: string;
  images: string[]; // pueden ser paths o URLs
  avatar?: File | null;
}) {
  const formData = new FormData();
  formData.append("audio_path", audioPath);
  // si el backend espera las images como archivos, habría que fetch each image and append blobs;
  // aquí asumimos que backend acepta lista de paths/urls en campo JSON:
  formData.append("images", JSON.stringify(images));
  if (avatar) formData.append("avatar", avatar);

  const res = await fetch(`${API_URL}/generate-video`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Error generating video");
  }

  const json = await res.json();
  const videoPath = normalizeVideoPath(json);
  return { videoPath };
}
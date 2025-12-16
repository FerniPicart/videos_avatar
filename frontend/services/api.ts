const API_URL = "http://localhost:8000";

export async function generateAudio(script: string, voice: string) {
  const formData = new FormData();
  formData.append("script", script);
  formData.append("voice", voice);

  const res = await fetch(`${API_URL}/generate-audio`, {
    method: "POST",
    body: formData,
  });

  return res.json();
}

export async function generateImages(
  topic: string,
  script: string,
  style: string
) {
  const formData = new FormData();
  formData.append("topic", topic);
  formData.append("script", script);
  formData.append("style", style);

  const res = await fetch(`${API_URL}/generate-images`, {
    method: "POST",
    body: formData,
  });

  return res.json();
}


export async function generateScript(
  topic: string,
  tone: string,
  duration: string,
  avatar: File
) {
  const formData = new FormData();
  formData.append("topic", topic);
  formData.append("tone", tone);
  formData.append("duration", duration);
  formData.append("avatar", avatar);

  const res = await fetch(`${API_URL}/generate-script`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Error generando guión");
  }

  return res.json();
}

export async function generateVideo(
  audioPath: string,
  images: string[]
) {
  const formData = new FormData();
  formData.append("audio_path", audioPath);
  formData.append("images", images.join(","));

  const res = await fetch(`${API_URL}/generate-video`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Error generando video");
  }

  return res.json();
}


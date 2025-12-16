import { useState } from "react";

type Props = {
  audioPath: string;
  images: string[];
};

export default function VideoGenerator({ audioPath, images }: Props) {
    const [loading, setLoading] = useState(false);
    const [videoPath, setVideoPath] = useState("");

    async function handleGenerate() {
        setLoading(true);

        const formData = new FormData();
        formData.append("audio_path", audioPath);
        formData.append("images", images.join(","));

        const res = await fetch("http://localhost:8000/generate-video", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        setVideoPath(data.video_path);
        setLoading(false);
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

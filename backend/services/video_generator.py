import os
import subprocess
import uuid
import shutil

VIDEO_DIR = "temp/video"
os.makedirs(VIDEO_DIR, exist_ok=True)

def generate_video(audio_path: str, image_paths: list[str]) -> str:
    if not shutil.which("ffmpeg"):
        raise RuntimeError("FFmpeg no está instalado")

    video_id = str(uuid.uuid4())
    output_video = f"{VIDEO_DIR}/{video_id}.mp4"
    list_file = f"{VIDEO_DIR}/{video_id}_images.txt"

    duration_per_image = 5

    with open(list_file, "w") as f:
        for img in image_paths:
            f.write(f"file '{os.path.abspath(img)}'\n")
            f.write(f"duration {duration_per_image}\n")

    command = [
        "ffmpeg",
        "-y",
        "-f", "concat",
        "-safe", "0",
        "-i", list_file,
        "-i", audio_path,
        "-shortest",
        "-pix_fmt", "yuv420p",
        output_video
    ]

    subprocess.run(command, check=True)
    return output_video

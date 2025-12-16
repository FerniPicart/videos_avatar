from dotenv import load_dotenv
load_dotenv()

import os
from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from services.tts_generator import generate_audio
from services.image_generator import generate_images_for_video
from services.video_generator import generate_video
from services.gemini_script_generator import generate_script_with_gemini

import shutil
import uuid
import os

# print("GEMINI_API_KEY:", os.getenv("GEMINI_API_KEY"))
load_dotenv()
app = FastAPI()

# CORS (frontend local)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Directorio temporal
TEMP_DIR = "temp"
os.makedirs("temp/audio", exist_ok=True)
os.makedirs("temp/images", exist_ok=True)
os.makedirs("temp/video", exist_ok=True)
os.makedirs(TEMP_DIR, exist_ok=True)

# Servir archivos generados (audio, luego video)
app.mount("/temp", StaticFiles(directory="temp"), name="temp")


@app.post("/generate-script")
async def generate_script_endpoint(
    topic: str = Form(...),
    tone: str = Form(...),
    duration: str = Form(...),
    avatar: UploadFile = Form(...)
):
    avatar_id = str(uuid.uuid4())
    avatar_path = f"{TEMP_DIR}/{avatar_id}_{avatar.filename}"

    with open(avatar_path, "wb") as buffer:
        shutil.copyfileobj(avatar.file, buffer)

    script = generate_script_with_gemini(topic, tone, duration)

    return {
        "script": script,
        "avatar_path": avatar_path
    }


@app.post("/generate-audio")
async def generate_audio_endpoint(
    script: str = Form(...),
    voice: str = Form(...)
):
    audio_path = await generate_audio(script, voice)

    return {
        "audio_path": audio_path
    }

@app.post("/generate-images")
async def generate_images_endpoint(
    topic: str = Form(...),
    script: str = Form(...),
    style: str = Form(...)
):
    images = generate_images_for_video(topic, script, style)
    return {"images": images}


@app.post("/generate-video")
async def generate_video_endpoint(
    audio_path: str = Form(...),
    images: str = Form(...)
):
    image_list = images.split(",")
    video_path = generate_video(audio_path, image_list)
    return {"video_path": video_path}


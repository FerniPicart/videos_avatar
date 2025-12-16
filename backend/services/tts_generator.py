import edge_tts
import uuid
import os

OUTPUT_DIR = "temp/audio"
os.makedirs(OUTPUT_DIR, exist_ok=True)


AVAILABLE_VOICES = {
    "ar_female": "es-AR-ElenaNeural",
    "es_male": "es-ES-AlvaroNeural",
    "mx_male": "es-MX-JorgeNeural",
    "es_female": "es-ES-ElviraNeural",
}

async def generate_audio(text: str, voice_key: str) -> str:
    if voice_key not in AVAILABLE_VOICES:
        raise ValueError("Voz no válida")

    voice = AVAILABLE_VOICES[voice_key]
    audio_id = str(uuid.uuid4())
    output_path = f"{OUTPUT_DIR}/{audio_id}.mp3"

    communicate = edge_tts.Communicate(text, voice)
    await communicate.save(output_path)

    return output_path

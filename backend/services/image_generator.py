import os
import uuid
import base64
import google.generativeai as genai

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

IMAGE_DIR = "temp/images"
os.makedirs(IMAGE_DIR, exist_ok=True)

MODEL_NAME = "models/imagen-3.0-generate-001"

def generate_images_for_video(
    topic: str,
    script: str,
    style_description: str,
    amount: int = 3
) -> list[str]:

    model = genai.GenerativeModel(MODEL_NAME)
    image_paths = []

    for _ in range(amount):
        prompt = f"""
Ilustración para un video educativo.

Tema:
{topic}

Guión:
{script}

Estilo:
{style_description}

Condiciones:
- Fondo limpio
- Sin texto
- Estilo ilustrado
"""

        result = model.generate_content(prompt)

        if not result.candidates:
            raise RuntimeError("Gemini no devolvió imágenes")

        part = result.candidates[0].content.parts[0]

        if not hasattr(part, "inline_data"):
            raise RuntimeError("Respuesta inesperada de Gemini")

        image_bytes = base64.b64decode(part.inline_data.data)


        image_id = str(uuid.uuid4())
        image_path = f"{IMAGE_DIR}/{image_id}.png"

        with open(image_path, "wb") as f:
            f.write(image_bytes)

        image_paths.append(image_path)

    return image_paths

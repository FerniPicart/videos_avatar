import os
import google.generativeai as genai

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

MODEL_NAME = "models/gemini-1.5-flash"

def generate_script_with_gemini(
    topic: str,
    tone: str,
    duration: str
) -> str:
    prompt = f"""
Quiero que generes un guión para un video corto de YouTube.

Tema: {topic}
Duración aproximada: {duration}
Tono: {tone}

Condiciones:
- Lenguaje claro y natural
- Español neutro
- No usar emojis
- Frases cortas
- Ideal para ser narrado por un avatar
- No menciones que sos una IA

Guión:
"""

    model = genai.GenerativeModel(MODEL_NAME)
    response = model.generate_content(prompt)

    return response.text.strip()

import google.generativeai as genai
import os

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("models/imagen-3.0-generate-001")
result = model.generate_content("Ilustración de un perro estilo cartoon")

image_base64 = result.candidates[0].content.parts[0].inline_data.data
print("Imagen generada OK")

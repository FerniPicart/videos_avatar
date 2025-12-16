def generate_script(topic: str, tone: str, duration: str) -> str:
    return f"""
Hola, hoy vamos a hablar sobre {topic}.

En este video, te lo voy a explicar de forma {tone}.
Este contenido está pensado para una duración aproximada de {duration}.

Empecemos.
"""

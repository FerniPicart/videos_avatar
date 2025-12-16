type Props = {
  topic: string;
  script: string;
  onGenerated: (images: string[]) => void; // Recibimos onGenerated
};

export default function ImageGenerator({ topic, script, onGenerated }: Props) {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  async function handleGenerate() {
    setLoading(true);
    const data = await generateImages(
      topic,
      script,
      "Ilustración estilo avatar educativo"
    );
    setImages(data.images);
    onGenerated(data.images); // Notificamos al padre
    setLoading(false);
  }

  return (
    <div>
      <h3>Imágenes</h3>

      <button onClick={handleGenerate} disabled={loading}>
        Generar imágenes
      </button>

      {loading && (
        <p>
          Generando imágenes con IA. Esto puede tardar algunos minutos...
        </p>
      )}

      {images.map((img, i) => (
        <img
          key={i}
          src={`http://localhost:8000/${img}`}
          style={{ width: "100%", marginTop: 10 }}
        />
      ))}
    </div>
  );
}

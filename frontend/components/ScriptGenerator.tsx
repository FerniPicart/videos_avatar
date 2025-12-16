type Props = {
  script: string;
  setScript: (v: string) => void;
};

export default function ScriptGenerator({ script, setScript }: Props) {
    return (
        <div>
            <h3>Guión</h3>
            <textarea
                rows={8}
                value={script}
                onChange={(e) => setScript(e.target.value)}
                style={{ width: "100%" }}
            />
        </div>
    );
}

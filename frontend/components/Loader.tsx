import React from "react";

// loader reutilizable (spinner + mensaje).

export default function Loader({ message = "Procesando...", small = false }: { message?: string; small?: boolean }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <div style={{
        width: small ? 16 : 32,
        height: small ? 16 : 32,
        borderRadius: "50%",
        border: "4px solid #ccc",
        borderTopColor: "#333",
        animation: "spin 1s linear infinite"
      }} />
      <div>{message}</div>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
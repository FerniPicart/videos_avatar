"use client";
import React, { useState, useEffect } from "react";

type Props = {
  onUpload: (file: File | null) => void;
};

export default function AvatarUploader({ onUpload }: Props) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div>
      <h3>Avatar</h3>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0] ?? null;
          onUpload(file);
          if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);
          } else {
            setPreview(null);
          }
        }}
      />
      {preview && (
        <div style={{ marginTop: 8 }}>
          <img src={preview} alt="avatar preview" style={{ width: 150, height: "auto", borderRadius: 8 }} />
        </div>
      )}
    </div>
  );
}
"use client";

import Image from "next/image";
import { useRef } from "react";
import useSWR from "swr";
import { listToolImages, uploadToolImage, deleteToolImage } from "../services/toolImages";

type Props = { asset: string };

export default function ToolsImageManager({ asset }: Props) {
  const { data: images = [], mutate } = useSWR(
    asset ? ["tool-images", asset] : null,
    () => listToolImages(asset)
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await uploadToolImage(asset, file);
    e.target.value = "";
    mutate();
  };

  const handleDelete = async (name: string) => {
    await deleteToolImage(asset, name);
    mutate();
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {images.map((name: string) => (
          <div key={name}>
            <Image src={`/tool-images/${name}`} alt={name} width={150} height={150} />
            <button onClick={() => handleDelete(name)}>Delete</button>
          </div>
        ))}
      </div>
      {images.length < 3 && (
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleUpload}
        />
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import axios from "axios";

interface UploadBoxProps {
  onUpload?: (url: string) => void;
}

export default function UploadBox({
  onUpload,
}: UploadBoxProps) {
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  async function uploadImage(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    const data = new FormData();

    data.append("file", file);
    data.append("upload_preset", "campusfind");

    try {
      setUploading(true);

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/hmokkds2/image/upload",
        data
      );

      setImage(res.data.secure_url);

      if (onUpload) {
        onUpload(res.data.secure_url);
      }

    } catch (error) {
      console.error(error);
      alert("Image upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="rounded-2xl border-2 border-dashed border-slate-300 p-8 text-center">

      {image ? (
        <img
          src={image}
          alt="Uploaded"
          className="mx-auto h-56 rounded-xl object-cover"
        />
      ) : (
        <p className="text-slate-500">
          Upload an image of the lost item
        </p>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={uploadImage}
        className="mt-6"
      />

      {uploading && (
        <p className="mt-4 text-blue-600">
          Uploading...
        </p>
      )}

    </div>
  );
}
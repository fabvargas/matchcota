"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

export function useUploadImages(userId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImages = async (files: File[]) => {
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const urls: string[] = [];

      for (const file of files) {
  if (!file.type.startsWith("image/")) {
    throw new Error(`Archivo no válido: ${file.name}`);
  }

  const filePath = `${userId}/${crypto.randomUUID()}`;


const blob = new Blob([file], { type: file.type });

const { error: uploadError } = await supabase.storage
  .from("pet_images")
  .upload(filePath, blob, {
    contentType: file.type,
  });

  if (uploadError) {
    console.error(uploadError);
    throw uploadError;
  }

  const { data } = supabase.storage
    .from("pet_images")
    .getPublicUrl(filePath);

  urls.push(data.publicUrl);
}

      console.log("✅ URLs generadas:", urls);
      return urls;

    } catch (err: any) {
      console.error("🔥 ERROR REAL:", err);
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    uploadImages,
    loading,
    error,
  };
}
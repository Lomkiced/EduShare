/**
 * hooks/use-file-upload.ts
 *
 * Custom hook for uploading files to Supabase Storage.
 * Returns upload progress, error state, and the uploaded file URL.
 */

"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface UploadOptions {
  bucket: string;         // Supabase Storage bucket name
  folder?: string;        // Optional sub-folder path
  maxSizeMB?: number;     // Max file size in MB (default: 50)
}

interface UploadResult {
  url: string;
  path: string;
}

export function useFileUpload(options: UploadOptions) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const { bucket, folder = "", maxSizeMB = 50 } = options;

  const upload = async (file: File): Promise<UploadResult | null> => {
    setError(null);
    setProgress(0);

    // Validate file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size must be less than ${maxSizeMB}MB`);
      return null;
    }

    setIsUploading(true);

    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const filePath = folder ? `${folder}/${fileName}` : fileName;

      const { data, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from(bucket).getPublicUrl(data.path);

      setProgress(100);
      return { url: publicUrl, path: data.path };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed";
      setError(message);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const reset = () => {
    setError(null);
    setProgress(0);
    setIsUploading(false);
  };

  return { upload, isUploading, progress, error, reset };
}

"use client";

import { useState, useRef } from "react";
import { FaEdit } from "react-icons/fa";
import ProfilePic from "./ProfilePic";
import { handleFileUpload } from "../_lib/userApi";

const ProfilePicUpload = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const imageUrlRef = useRef<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB.");
        return;
      }

      setError(null);
      setIsLoading(true);

      try {
        const url = await handleFileUpload(file);
        imageUrlRef.current = url;
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "An error occurred during upload."
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="relative w-[75px]">
      {isLoading ? (
        <span className="block animate-spin border-4 border-gray-300 rounded-full h-14 w-14 border-r-indigo-500"></span>
      ) : (
        <ProfilePic className="scale-150" />
      )}

      <button
        type="button"
        title="Upload profile pic"
        className="absolute right-0 text-2xl translate-y-1"
        onClick={() => fileInputRef.current?.click()}
        aria-label="Upload profile picture"
      >
        <FaEdit />
      </button>

      <input
        id="fileInput"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        aria-describedby="fileInputDescription"
        ref={fileInputRef}
      />
      <span id="fileInputDescription" className="sr-only">
        Upload a profile picture (JPEG, PNG, or GIF, max 5MB)
      </span>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default ProfilePicUpload;

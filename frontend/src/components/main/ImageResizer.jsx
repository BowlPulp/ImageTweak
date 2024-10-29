import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ImageCompressor = () => {
  const [file, setFile] = useState(null);
  const [quality, setQuality] = useState(80);
  const [dragging, setDragging] = useState(false);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    toast.success("Image uploaded successfully!");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const uploadedFile = e.dataTransfer.files[0];
    setFile(uploadedFile);
    toast.success("Image uploaded successfully via drag and drop!");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleCompress = () => {
    if (!file) {
      toast.error("Please upload an image first.");
      return;
    }

    const image = new Image();
    image.src = URL.createObjectURL(file);

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0, image.width, image.height);

      canvas.toBlob(
        (blob) => {
          const downloadUrl = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = downloadUrl;
          link.download = `compressed_image.jpg`;
          link.click();
          toast.success("Image compressed and downloaded successfully!");
        },
        "image/jpeg",
        quality / 100
      );
    };

    image.onerror = () => {
      toast.error("Failed to load the image. Please try again.");
    };
  };

  return (
    <div className="bg-black h-screen w-full mt-16">
      <ToastContainer />
      <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg m-auto">
        <h1 className="text-2xl font-bold mb-4">Image Compressor</h1>

        {/* Drag and Drop Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-4 mb-4 relative ${
            dragging ? "border-blue-600" : "border-gray-300"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <p className="text-center text-gray-600">
            {file ? (
              <span className="font-semibold">{file.name}</span>
            ) : (
              <span className="text-gray-400">Drag & drop your image here or click to upload</span>
            )}
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            id="fileInput"
          />
          <label
            htmlFor="fileInput"
            className="w-full h-full cursor-pointer absolute top-0 left-0"
          />
        </div>

        {/* Preview Image */}
        {file && (
          <div className="mb-4">
            <img
              src={URL.createObjectURL(file)}
              alt="preview"
              className="w-full h-auto rounded-lg shadow-sm"
            />
          </div>
        )}

        {/* Quality Selector */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Quality (%)</label>
          <input
            type="number"
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-lg"
            max="100"
            min="1"
          />
        </div>

        {/* Compress Button */}
        <button
          onClick={handleCompress}
          className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none"
        >
          Compress Image
        </button>
      </div>
    </div>
  );
};

export default ImageCompressor;

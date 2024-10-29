import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "./LandingPage";

const ImageConverter = () => {
  const [file, setFile] = useState(null);
  const [format, setFormat] = useState("jpeg");
  const [dragging, setDragging] = useState(false);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      toast.success("File uploaded successfully!");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const uploadedFile = e.dataTransfer.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      toast.success("File uploaded successfully!");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleFormatChange = (e) => {
    setFormat(e.target.value);
  };

  const handleConvert = async () => {
    if (!file) {
      toast.error("Please upload a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("format", format);

    try {
      const response = await fetch("http://localhost:2000/convert", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = `converted.${format}`;
        link.click();
        toast.success("Image converted successfully!");
      } else {
        toast.error("Failed to convert image.");
      }
    } catch (error) {
      toast.error("Error occurred during conversion.");
      console.error("Error:", error);
    }
  };

  const handleRemoveImage = () => {
    setFile(null);
    toast.info("Image removed. Please upload a new one.");
  };

  return (
    <>
    <div className="bg-black min-h-screen w-full mt-16 p-8">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable pauseOnFocusLoss />
      <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg m-auto">
        <h1 className="text-2xl font-bold mb-4">Image Format Converter</h1>

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
          <div className="mb-4 relative">
            <img
              src={URL.createObjectURL(file)}
              alt="preview"
              className="w-full h-auto rounded-lg shadow-sm"
            />
            {/* Cross Button to Remove Image */}
            <button
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
              title="Remove Image"
            >
              &times; {/* Cross symbol */}
            </button>
          </div>
        )}

        {/* Format Selection */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Select Format</label>
          <select
            value={format}
            onChange={handleFormatChange}
            className="block w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="jpeg">JPEG</option>
            <option value="png">PNG</option>
            <option value="gif">GIF</option>
            <option value="bmp">BMP</option>
            <option value="webp">WEBP</option>
          </select>
        </div>

        {/* Convert Button */}
        <button
          onClick={handleConvert}
          className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none"
        >
          Convert Image
        </button>
      </div>
    </div>
    </>
  );
};

export default ImageConverter;

import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MemeCreator = () => {
  const [name, setName] = useState('');
  const [selectedImage, setSelectedImage] = useState('https://raw.githubusercontent.com/BowlPulp/ImageTweak/main/frontend/public/images/meme1.jpg'); // Set initial image as raw URL
  const [generatedMeme, setGeneratedMeme] = useState(null);

  // Predefined images with raw GitHub URLs
  const images = [
    { id: 1, src: 'https://raw.githubusercontent.com/BowlPulp/ImageTweak/main/frontend/public/images/meme1.jpg', name: 'Meme 1' },
    { id: 2, src: 'https://raw.githubusercontent.com/BowlPulp/ImageTweak/main/frontend/public/images/meme2.jpg', name: 'Meme 2' },
    { id: 3, src: 'https://raw.githubusercontent.com/BowlPulp/ImageTweak/main/frontend/public/images/meme3.jpg', name: 'Meme 3' }
  ];

  const handleGenerateMeme = async () => {
    try {
      const response = await fetch('http://localhost:2000/generate-meme', { // Update this to your deployed URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          image: selectedImage
        })
      });

      if (!response.ok) {
        throw new Error('Error generating meme');
      }

      const blob = await response.blob(); // Get the response as a Blob
      const url = URL.createObjectURL(blob); // Create a URL for the blob
      setGeneratedMeme(url); // Set the URL for displaying the generated meme
      toast.success('Meme generated successfully!'); // Show success toast
    } catch (error) {
      console.error(error);
      toast.error('Failed to generate meme. Please try again.'); // Show error toast
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen mt-16">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Meme Creator</h1>
      
      <div className="w-full max-w-md mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2">Enter Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 mb-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-indigo-500"
        />
      </div>
      
      <div className="w-full max-w-md mb-6">
        <label className="block text-gray-700 text-sm font-medium mb-2">Select Meme Template</label>
        <select
          onChange={(e) => setSelectedImage(e.target.value)}
          value={selectedImage}
          className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-indigo-500"
        >
          {images.map((img) => (
            <option key={img.id} value={img.src}>
              {img.name}
            </option>
          ))}
        </select>
      </div>
      
      <button
        onClick={handleGenerateMeme}
        className="px-5 py-2 bg-indigo-600 text-white rounded font-medium hover:bg-indigo-700 transition duration-150 mb-6"
      >
        Generate Meme
      </button>

      {/* Display the generated meme image */}
      {generatedMeme && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Your Generated Meme:</h2>
          <img
            src={generatedMeme}
            alt="Generated Meme"
            className="border border-gray-400 rounded-lg mb-2"
            style={{ maxWidth: '500px', maxHeight: '500px' }}
          />
          <a
            href={generatedMeme}
            download="meme.png"
            className="px-5 py-2 bg-green-500 text-white rounded font-medium hover:bg-green-600 transition duration-150"
          >
            Download Meme
          </a>
        </div>
      )}
      
      <ToastContainer /> {/* Add ToastContainer for displaying toasts */}
    </div>
  );
};

export default MemeCreator;

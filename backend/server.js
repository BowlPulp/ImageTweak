const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 2000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json());

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Endpoint for image conversion
app.post('/convert', upload.single('image'), async (req, res) => {
  const { format } = req.body; // Get desired format from the request
  const imageBuffer = req.file.buffer; // Get the image buffer from multer

  try {
    // Convert image using sharp
    const convertedImage = await sharp(imageBuffer)
      .toFormat(format) // Convert to the desired format (jpeg, png, gif, etc.)
      .toBuffer();

    // Set the response header for file download
    res.set('Content-Type', `image/${format}`);
    res.set('Content-Disposition', `attachment; filename=converted.${format}`);
    res.send(convertedImage); // Send the converted image as response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error converting image' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

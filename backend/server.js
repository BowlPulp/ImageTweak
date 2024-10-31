const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

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

// Endpoint for meme generation
app.post('/generate-meme', upload.none(), async (req, res) => {
  const { name, image } = req.body;

  if (!name || !image) {
    return res.status(400).json({ error: 'Name and image are required' });
  }

  // Path to the meme template in the 'public/images' directory
  const imagePath = path.join(__dirname, 'public', 'images', image);

  if (!fs.existsSync(imagePath)) {
    return res.status(404).json({ error: 'Template image not found' });
  }

  try {
    // Generate meme with text overlay using Sharp
    const meme = await sharp(imagePath)
      .resize(500, 500)
      .composite([
        {
          input: Buffer.from(
            `<svg height="500" width="500">
               <text x="35%" y="102%" font-size="30" fill="black" text-anchor="middle" font-family="Arial" transform="rotate(-45 100,400)">${name}</text>
             </svg>`
          ),
          gravity: 'south',
        },
      ])
      .toBuffer();

    // Send the generated meme as response
    res.set('Content-Type', 'image/png');
    res.set('Content-Disposition', 'attachment; filename=meme.png');
    res.send(meme);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generating meme' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

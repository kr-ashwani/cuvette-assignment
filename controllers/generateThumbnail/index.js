const axios = require('axios');
const path = require('path');
const sharp = require('sharp');

const generateThumbnailController = async (req, res) => {
  const { imageUrl } = req.body;

  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'utf-8');

    const imageName = imageUrl.split('/').pop().split('.');
    imageName.pop();
    imageName.join('');
    const renameImage = path.join(
      __dirname,
      `../../thumbnails/${imageName}_${Date.now()}.jpeg`
    );
    sharp(buffer)
      .resize(50, 50)
      .toFile(renameImage, (err) => {
        if (err) throw Error('Failed to convert ');
        res.sendFile(renameImage);
      });
  } catch (err) {
    console.log(err.message);
    res.status(500).json(`failed to create thumbnail.`);
  }
};

module.exports = generateThumbnailController;

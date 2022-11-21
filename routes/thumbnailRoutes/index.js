const express = require('express');
const generateThumbnailController = require('../../controllers/generateThumbnail');

const router = express.Router();

router.post('/generatethumbnail', generateThumbnailController);

module.exports = router;

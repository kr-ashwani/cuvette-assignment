const express = require('express');
const jsonPathController = require('../../controllers/jsonPath');

const router = express.Router();

router.post('/jsonpatch', jsonPathController);

module.exports = router;

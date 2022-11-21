const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
  console.log(req.cookies);
  res.sendFile(path.join(__dirname, '../../view/index.html'));
});

module.exports = router;

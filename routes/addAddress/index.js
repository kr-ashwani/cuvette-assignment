const express = require('express');
const addAddressController = require('../../controllers/addAddress');

const router = express.Router();

router.post('/addaddress', addAddressController);

module.exports = router;

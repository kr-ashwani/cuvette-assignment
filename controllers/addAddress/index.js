const User = require('../../models/User');
const handleErrors = require('../utils/handleErrors');

const addAddressController = async (req, res) => {
  const { address } = req.body;
  if (!address) return res.status(400).json('address is required');
  try {
    const user = await User.findOneAndUpdate(
      { username: req.userInfo.username },
      { address },
      { new: true }
    ).exec();

    const userInfo = (({
      username,
      address: addressInfo,
      createdAt,
      lastLoginAt,
    }) => ({
      username,
      address: addressInfo,
      createdAt,
      lastLoginAt,
    }))(user);

    res.status(200).json({ userInfo });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json(handleErrors(err));
  }
};

module.exports = addAddressController;

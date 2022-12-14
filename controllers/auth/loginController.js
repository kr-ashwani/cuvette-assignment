const bcrypt = require('bcrypt');
const handleErrors = require('../utils/handleErrors');
const User = require('../../models/User');
const { createAccessToken } = require('../utils/newJwtToken');

module.exports = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!(username && password))
      return res.status(400).json(' username or password is missing ');

    const user = await User.findOne({ username }).exec();
    if (!user) return res.status(403).json('user is not registered.');

    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) return res.status(403).json('password did not match.');

    const payloadData = {
      username,
      createdAt: user.createdAt,
    };
    const accessToken = createAccessToken(payloadData);

    res.cookie('_auth_token', accessToken, {
      httpOnly: true,
      maxAge: process.env.ACCESS_TOKEN_EXP_TIME,
      sameSite: 'lax',
    });

    res.status(200).json('logged in successfully and JWT is sent as cookie.');
  } catch (err) {
    const message = handleErrors(err);
    res.status(403).json({ message });
  }
};

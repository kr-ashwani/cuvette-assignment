const bcrypt = require('bcrypt');
const handleErrors = require('../utils/handleErrors');
const User = require('../../models/User');
const { createAccessToken } = require('../utils/newJwtToken');

module.exports = async (req, res) => {
  try {
    const { password, username } = req.body;

    if (!(password && username))
      return res.status(400).json('password or username is missing');

    if (password.length < 6)
      return res
        .status(403)
        .json('password should contain atleast 6 characters.');

    const hashedPassword = await bcrypt.hash(password, 10);

    const checkUser = await User.findOne({ username }).exec();
    if (checkUser)
      return res
        .status(400)
        .json('you have an existing account.Try logging in.');

    const { createdAt } = await User.create({
      username,
      password: hashedPassword,
    });

    const payloadData = {
      username,
      createdAt,
    };
    const accessToken = createAccessToken(payloadData);

    res.cookie('_auth_token', accessToken, {
      httpOnly: true,
      maxAge: process.env.ACCESS_TOKEN_EXP_TIME,
      sameSite: 'lax',
    });

    res
      .status(200)
      .json('Account created sucessfully.JWT token is sent as cookie');
  } catch (err) {
    const message = handleErrors(err);
    res.status(403).json({ message });
  }
};

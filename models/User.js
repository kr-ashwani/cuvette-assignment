const mongoose = require('mongoose');

const schemaOptions = {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'lastLoginAt',
  },
};

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      lowercase: true,
      trim: true,
      unique: [true, 'This username already exists.'],
      required: [true, 'enter username'],
    },
    password: {
      type: String,
      minlength: [6, 'Minimum password length should be 6 characters'],
      required: [true, 'enter password'],
    },
    address: {
      type: String,
      default: null,
    },
  },
  schemaOptions
);

const User = mongoose.model('user', UserSchema);
module.exports = User;

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const homepageRoute = require('./routes/homepage');
const jsonPathRoutes = require('./routes/jsonPatchRoutes');
const thumbnailRoutes = require('./routes/thumbnailRoutes');
const addressRoutes = require('./routes/addAddress');
const authenticateUser = require('./middleware/authenticateUser');

const app = express();
const PORT = process.env.PORT || 3300;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('connected to mongodb server.'))
  .catch(() => console.error.bind(console, 'MongoDB connection error.'));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  enabling anyone to access api resources
app.use(cors({}));

//  all routes endpoints mentioned on homepage
app.use(homepageRoute);

//  public routes for authentication(login,signup and logout)
app.use(authRoutes);

//  authenticates user and populates userInfo property in req object
app.use(authenticateUser);

//  Apply the json patch to the json object
app.use(jsonPathRoutes);

//  generate thumbnail
app.use(thumbnailRoutes);

//  add address
app.use(addressRoutes);

app.listen(PORT, () => console.log(`server running on ${PORT}`));

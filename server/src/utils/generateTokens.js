const jwt = require('jsonwebtoken');
require('dotenv').config();
const { ACCESS_SECRET, REFRESH_SECRET_KEY } = process.env;
const jwtConfig = require('../config/jwtConfig');

module.exports = (user) => {
  console.log(REFRESH_SECRET_KEY, ACCESS_SECRET);

  try {
    const refreshToken = jwt.sign({ user }, REFRESH_SECRET_KEY, jwtConfig.refresh);
    const accessToken = jwt.sign({ user }, ACCESS_SECRET, jwtConfig.access);

    return { accessToken, refreshToken };
  } catch (error) {
    return error;
  }
};

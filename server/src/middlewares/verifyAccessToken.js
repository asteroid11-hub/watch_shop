const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyAccessToken(req, res, next) {
  try {
    const accessToken = req.headers.authorization.split(' ')[1]; // Bearer <accessToken>
    const { user } = jwt.verify(accessToken, process.env.ACCESS_SECRET);
    res.locals.user = user;
    next();
  } catch (error) {
    console.log('Токен доступа не действительный');
    res.status(403).json({ ...error, text: 'Токен доступа не действительный' });
  }
}

module.exports = verifyAccessToken;

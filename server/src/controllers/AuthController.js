const generateTokens = require('../utils/generateTokens');
const cookieConfig = require('../config/cookieConfig');
require('dotenv').config();
const AuthDbService = require('../services/AuthDbService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthController {
  static async authenticateUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = (await AuthDbService.getUserByEmail(email)).get({ plain: true });
      console.log(user.password);
      console.log(password);

      if (!user) return res.status(401).json({ message: 'Пользователь не найден' });

      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log(isPasswordValid);

      if (!isPasswordValid) return res.status(401).json({ message: 'Неверный пароль' });
      const { accessToken, refreshToken } = generateTokens({ user });
      delete user.password; // Удаляем пароль из объекта пользователя перед отправкой в ответ
      return res
        .status(200)
        .cookie('refreshToken', refreshToken, cookieConfig)
        .json({ user, accessToken });
    } catch (error) {
      return res.status(500).json({ error, message: 'Ошибка при проверке пользователя' });
    }
  }

  static async registerUser(req, res) {
    try {
      const { email, password, name } = req.body;
      console.log(email, password);

      const existingUser = await AuthDbService.getUserByEmail(email);

      if (existingUser) {
        return res
          .status(409)
          .json({ message: 'Пользователь с таким email уже существует' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = (
        await AuthDbService.createUser({ email, password: hashedPassword, name })
      ).get({ plain: true });

      delete newUser.password;

      const { accessToken, refreshToken } = generateTokens(newUser);
      return res
        .status(201)
        .cookie('refreshToken', refreshToken, cookieConfig)
        .json({ user: newUser, accessToken });
    } catch (error) {
      return res
        .status(500)
        .json({ error, Message: 'Ошибка при регистрации пользователя' });
    }
  }

  static async refreshToken(req, res) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        return res.status(401).json({ message: 'Нет токена для обновления' });
      }
      const { user } = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);
      const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);
      return res
        .status(200)
        .cookie('refreshToken', newRefreshToken, cookieConfig)
        .json({ accessToken });
    } catch (error) {
      return res.status(401).json({ error, message: 'Неверный токен' });
    }
  }
}

module.exports = AuthController;

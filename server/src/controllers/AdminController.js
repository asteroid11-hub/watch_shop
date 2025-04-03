const generateTokens = require('../utils/generateTokens');
const cookieConfig = require('../config/cookieConfig');
require('dotenv').config();
const AuthDbService = require('../services/AuthDbService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AIService = require('../services/AIService');
const arrayToCsv = require('../utils/csvConvert');

class AdminController {
  static async secretToken(req, res) {
    try {
      console.log(req.body);

      const user = await AuthDbService.getUserByEmail(req.body.email);
      if (!user) return res.status(401).json({ error: 'Invalid email' });

      console.log(user);
      return res.status(200).json({
        secretKey: user.secretKey,
      });
    } catch (error) {
      console.log('Error in Admin Controller:', error.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async aiDescription(req, res) {
    console.log(req.body);

    try {
      const { prompt } = req.body;

      if (!prompt) return res.status(400).json({ error: 'Prompt is required' });
      const description = await AIService.getDescription(prompt);
      return res.json({ description });
    } catch (error) {
      console.error('Error generating AI description:', error.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getCSV(req, res) {
    try {
      const csvData = await AuthDbService.getAllFeedbacks();
      console.log(csvData);
      const fileName = await arrayToCsv(csvData);
      console.log(fileName);

      res.download(`${fileName}`, 'feedback.csv', (err) => {
        if (err) {
          console.error('Error sending file:', err);
          res.status(500).json({ error: 'Error sending file' });
        }
      });
    } catch (error) {
      console.log('Error fetching CSV data:', error.message);
    }
  }
}

module.exports = AdminController;

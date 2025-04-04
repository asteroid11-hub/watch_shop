const FeedBackService = require('../services/FeedbackService');
const multer = require('multer');
const upload = multer({ dest: 'uploads/feedback/' });

class FeedbackController {
  static async getAllFeedbacks(req, res) {
    try {
      const feedbacks = await FeedBackService.getAllFeedbacks();
      res.json(feedbacks);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Ошибка со стороны сервера при получение данных из таблицы Feedback',
      });
    }
  }

  static async createFeedback(req, res) {
    try {
      const { email, name, message } = req.body;
      const filePath = req.file ? `/uploads/feedback/${req.file.filename}` : null;

      await FeedBackService.createFeedback(email, name, message, filePath);

      res.status(200).json({ message: 'Форма успешно отправлена' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ошибка при создании данных' });
    }
  }

  static async deleteFeedback(req, res) {
    try {
      const { id } = req.params;
      const deletedFeedback = await FeedBackService.deleteFeedback(id);
      res.json(deletedFeedback);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Ошибка со стороны сервера при удаление данных из таблицы Feedback',
      });
    }
  }
}

module.exports = FeedbackController;

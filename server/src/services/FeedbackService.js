const { Feedback } = require('../../db/models');

class FeedBackService {
  static async getAllFeedbacks() {
    const feedbacks = await Feedback.findAll();
    return feedbacks;
  }

  static async createFeedback(email, name, message, filePath) {
    const newFeedback = await Feedback.create({ email, name, message, filePath });
    return newFeedback;
  }

  static async deleteFeedback(id) {
    const feedback = await Feedback.findByPk(id);
    if (!feedback) {
      throw new Error('Feedback not found');
    }
    await feedback.destroy();
    return { message: 'Feedback deleted successfully' };
  }
}

module.exports = FeedBackService;

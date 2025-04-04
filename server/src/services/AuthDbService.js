const { Admin, Feedback } = require('../../db/models');

class AuthDbService {
  static async createUser(user) {
    try {
      const newUser = await Admin.create(user);
      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user');
    }
  }

  static async getAllFeedbacks() {
    try {
      const feedbacks = (await Feedback.findAll()).map((feedback) =>
        feedback.get({ plain: true }),
      );
      
      return feedbacks;
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
      throw new Error('Failed to fetch feedbacks');
    }
  }

  static async getUserByEmail(email) {
    try {
      const user = await Admin.findOne({ where: { email } });
      return user;
    } catch (error) {
      console.error('Error fetching user by email:', error);
      throw new Error('Failed to fetch user');
    }
  }

  static async getsecretKey(email) {
    try {
      const user = await Admin.findOne({ where: { email } });
      return user.secretKey;
    } catch (error) {
      console.log('Error fetching secret key:', error);
      throw new Error('Failed to fetch secret key');
    }
  }
}

module.exports = AuthDbService;

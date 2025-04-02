const { Admin } = require('../../db/models');

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

  static async getUserByEmail(email) {
    try {
      const user = await Admin.findOne({ where: { email } });
      return user;
    } catch (error) {
      console.error('Error fetching user by email:', error);
      throw new Error('Failed to fetch user');
    }
  }
}

module.exports = AuthDbService;

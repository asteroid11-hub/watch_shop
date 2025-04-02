const {Feedback} = require('../../db/models')

class FeedBackService {

    static async getAllFeedbacks() {
        const feedbacks = await Feedback.findAll()
        return feedbacks
    }

    static async createFeedback(name, number, email, comment) {
        const newFeedback = await Feedback.create({name, number, email, comment})
        return newFeedback
    }
    
    static async deleteFeedback(id) {
        const feedback = await Feedback.findByPk(id)
        if (!feedback) {
            throw new Error('Feedback not found')
        }
        await feedback.destroy()
        return {message: 'Feedback deleted successfully'}
    }
}

module.exports = FeedBackService
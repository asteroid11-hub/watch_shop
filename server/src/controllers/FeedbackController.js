const FeedBackService = require("../services/FeedbackService")

class FeedbackController {

    static async getAllFeedbacks(req, res) {
        try {
            const feedbacks = await FeedBackService.getAllFeedbacks()
            res.json(feedbacks)
        } catch (error) {
            console.error(error)
            res.status(500).json({error: 'Ошибка со стороны сервера при получение данных из таблицы Feedback'})
        }
    }

    static async createFeedback(req, res) {
        try {
            const {name, number, email, comment} = req.body
            const newFeedback = await FeedBackService.createFeedback(name, number, email, comment)
            res.status(201).json(newFeedback)
        } catch (error) {
            console.error(error)
            res.status(500).json({error: 'Ошибка со стороны сервера при создание данных в таблицу Feedback'})
        }
    }

    static async deleteFeedback(req, res) {
        try {
            const {id} = req.params
            const deletedFeedback = await FeedBackService.deleteFeedback(id)
            res.json(deletedFeedback)
        } catch (error) {
            console.error(error)
            res.status(500).json({error: 'Ошибка со стороны сервера при удаление данных из таблицы Feedback'})
        }
    }

}

module.exports = FeedbackController
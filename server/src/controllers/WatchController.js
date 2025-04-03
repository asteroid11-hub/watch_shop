const WatchService = require('../services/WatchService');
const multer = require('multer');
const upload = multer({ dest: 'uploads/watch/' });

class WatchController {
  static async getAll(req, res) {
    try {
      const watches = await WatchService.getAll();
      res.json(watches);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Ошибка со стороны сервера при получение данных из таблицы Watch',
      });
    }
  }

  static async getOneWatch(req, res) {
    try {
      const { id } = req.params;
      const oneWatch = await WatchService.getOneWatch(id);
      if (!oneWatch) {
        res.status(404).json({ error: 'Часы не найдены' });
      }
      res.status(200).json(oneWatch);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Ошибка со стороны сервера при получение данных из таблицы Watch',
      });
    }
  }

  static async createWatch(req, res) {
    try {
      const { model, description } = req.body;
      const image = req.file ? `/uploads/watch/${req.file.filename}` : null;

      if (!model || !description || !image) {
        return res.status(400).json({ error: 'Не все поля заполнены' });
      }

      await WatchService.createWatch(model, description, image);
      res.status(201).json({ message: 'Форма успешно отправлена' });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: { error: 'Ошибка при создании данных' },
      });
    }
  }

  static async updateWatch(req, res) {
    try {
      const { id } = req.params;
      const { model, description, image } = req.body;
      const updatedWatch = await WatchService.updateWatch(id, model, description, image);
      res.status(201).json(updatedWatch);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Ошибка со стороны сервера при изминение данных в таблице Watch',
      });
    }
  }

  static async deleteWatch(req, res) {
    try {
      const { id } = req.params;
      await WatchService.deleteWatch(id);
      res.status(204).send('Данные успешно удалены!');
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Ошибка со стороны сервера при удаление данных из таблицы Watch',
      });
    }
  }
}

module.exports = WatchController;

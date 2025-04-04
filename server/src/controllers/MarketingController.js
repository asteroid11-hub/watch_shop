const MarketingService = require('../services/MarketingService');
const multer = require('multer');
const upload = multer({ dest: 'uploads/feedback/' });

class MarketingController {
  static async getAll(req, res) {
    try {
      const marketings = await MarketingService.getAll();
      res.json(marketings);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Ошибка со стороны сервера при получение данных из таблицы',
      });
    }
  }

  static async getOne(req, res) {
    try {
      const { id } = req.params;
      const oneMarketing = await MarketingService.getOne(id);
      if (!oneMarketing) {
        res.status(404).json({ error: 'Часы не найдены' });
      }
      res.status(200).json(oneMarketing);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Ошибка со стороны сервера при получение данных из таблицы Watch',
      });
    }
  }

  static async create(req, res) {
    try {
      const { model, description } = req.body;

      const image = req.file ? `/uploads/marketing/${req.file.filename}` : null;
      console.log(model, description, image);

      if (!model || !description || !image) {
        return res.status(400).json({ error: 'Не все поля заполнены' });
      }
      const newMarketing = await MarketingService.create(model, description, image);
      return res.status(201).json(newMarketing);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Ошибка со стороны сервера при создание данных в таблицу Watch',
      });
    }
  }

  // static async update(req, res) {
  //   try {
  //     const { id } = req.params;
  //     console.log(req.body);

  //     const { model, description} = req.body;

  //     const {image}=req.file
  //     console.log(image);
  //     const updatedMarketing = await MarketingService.update(id, model, description, image);
  //     res.status(201).json(updatedMarketing);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({
  //       error: 'Ошибка со стороны сервера при изминение данных в таблице Watch',
  //     });
  //   }
  // }

  static async update(req, res) {
    try {
      const { id } = req.params;
      console.log('req.body:', req.body); // Для отладки
      console.log('req.file:', req.file); // Проверяем загруженный файл

      // Получаем данные из формы
      const { model, description } = req.body;

      // Если загружен новый файл - используем его, иначе оставляем старый
      const image = req.file ? `/uploads/marketing/${req.file.filename}` : req.body.image;

      if (!model || !description) {
        return res.status(400).json({ error: 'Не все обязательные поля заполнены' });
      }

      console.log(image);

      const updatedMarketing = await MarketingService.update(id, {
        model,
        description,
        image,
      });

      res.status(200).json(updatedMarketing);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Ошибка при обновлении данных',
      });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      await MarketingService.delete(id);
      res.status(204).send('Данные успешно удалены!');
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Ошибка со стороны сервера при удаление данных из таблицы Watch',
      });
    }
  }
}

module.exports = MarketingController;

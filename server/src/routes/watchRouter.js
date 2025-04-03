const express = require('express');

const multer = require('multer');
const path = require('path');
const WatchController = require('../controllers/WatchController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../uploads'); // Папка для хранения загруженных файлов
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Уникальное имя файла
  },
});

const upload = multer({ storage });

const watchRouter = express.Router();

watchRouter
  .route('/')
  .get(WatchController.getAll)
  .post(upload.single('name_of_file_input'), (req, res) => {
    const { model, description } = req.body;
    const { file } = req;

    console.log('Модель:', model);
    console.log('Описание:', description);
    console.log('Файл:', file);

    res.status(201).json({
      message: 'Часы успешно добавлены!',
      watch: {
        model,
        description,
        image: file.path,
      },
    });
  });

watchRouter
  .route('/:id')
  .get(WatchController.getOneWatch)
  .put(WatchController.updateWatch)
  .delete(WatchController.deleteWatch);

module.exports = watchRouter;

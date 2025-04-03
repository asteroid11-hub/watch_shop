'use strict';

const bcrypt = require('bcrypt');

const { Admin, Feedback, Watch } = require('../../db/models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Admin.bulkCreate([
      {
        name: 'admin',
        email: 'engineer89@gmail.com',
        password: await bcrypt.hash('admin', 10),
        secretKey: '123456789',
      },
    ]);

    await Feedback.bulkCreate([
      {
        email: 'ivan.ivanov@example.com',
        name: 'Иван Иванов',
        message: 'Отличный сервис!',
        filePath: 'uploads/file1.jpg', // Пример пути к файлу
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'maria.petrova@example.com',
        name: 'Мария Петрова',
        message: 'Все очень понравилось!',
        filePath: 'uploads/file2.jpg', // Пример пути к файлу
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'alexey.smirnov@example.com',
        name: 'Алексей Смирнов',
        message: 'Рекомендую всем!',
        filePath: 'uploads/file2.jpg', // Пример пути к файлу
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await Watch.bulkCreate([
      {
        model: 'Rolex Submariner',
        description: 'Часы для дайвинга с водонепроницаемостью до 300 метров.',
        image: '1743682805251-wallhaven-nm66rk.jpg',
      },
      {
        model: 'Omega Seamaster',
        description: 'Стильные и надежные часы для активного отдыха.',
        image: '123-wallhaven.jpg',
      },
      {
        model: 'Patek Philippe Nautilus',
        description:
          'Элегантные часы с уникальным дизайном и высоким уровнем мастерства.',
        image:
          'patex_philippe.jpg',
      },
      {
        model: 'Audemars Piguet Royal Oak',
        description: 'Классические часы с уникальным восьмиугольным безелем.',
        image:
          'Lookbook_video_code_v2.mp4',
      },
      {
        model: 'Rolex Submariner',
        description: 'Часы для дайвинга с водонепроницаемостью до 300 метров.',
        image: '1743682805251-wallhaven-nm66rk.jpg',
      },
      {
        model: 'Omega Seamaster',
        description: 'Стильные и надежные часы для активного отдыха.',
        image: '123-wallhaven.jpg',
      },
      {
        model: 'Patek Philippe Nautilus',
        description:
          'Элегантные часы с уникальным дизайном и высоким уровнем мастерства.',
        image:
          'patex_philippe.jpg',
      },
      {
        model: 'Audemars Piguet Royal Oak',
        description: 'Классические часы с уникальным восьмиугольным безелем.',
        image:
          'Lookbook_video_code_v2.mp4',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Admins', null, {});
    await queryInterface.bulkDelete('Feedbacks', null, {});
    await queryInterface.bulkDelete('Watches', null, {});
  },
};

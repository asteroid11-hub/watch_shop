'use strict';

const bcrypt = require('bcrypt');

const { Admin, Feedback, Watch, Marketing } = require('../../db/models');

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
        filePath: 'uploads/feedback/file1.jpg', // Пример пути к файлу
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'maria.petrova@example.com',
        name: 'Мария Петрова',
        message: 'Все очень понравилось!',
        filePath: 'uploads/feedback/file2.jpg', // Пример пути к файлу
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'alexey.smirnov@example.com',
        name: 'Алексей Смирнов',
        message: 'Рекомендую всем!',
        filePath: 'uploads/feedback/file2.jpg', // Пример пути к файлу
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await Watch.bulkCreate([
      {
        model: 'Rolex Submariner',
        description: 'Часы для дайвинга с водонепроницаемостью до 300 метров.',
        image: '1.jpg',
      },
      {
        model: 'Omega Seamaster',
        description: 'Стильные и надежные часы для активного отдыха.',
        image: '2.jpg',
      },
      {
        model: 'Tag Heuer Carrera',
        description: 'Спортивные часы с хронографом для гонщиков.',
        image: '3.jpg',
      },
      {
        model: 'Patek Philippe Nautilus',
        description: 'Роскошные часы с уникальным дизайном в форме porthole.',
        image: '4.jpg',
      },
      {
        model: 'Audemars Piguet Royal Oak',
        description: 'Легендарные часы с узнаваемым октагональным bezel.',
        image: '5.jpg',
      },
      {
        model: 'Breitling Navitimer',
        description: 'Культовые авиационные часы со встроенным flight computer.',
        image: '6.jpg',
      },
      {
        model: 'Jaeger-LeCoultre Reverso',
        description: 'Элегантные часы с переворачивающимся корпусом.',
        image: '7.jpg',
      },
      {
        model: 'IWC Portugieser',
        description: 'Классические морские хронометры с чистым дизайном.',
        image: '8.jpg',
      },
    ]);

    await Marketing.bulkCreate([
      {
        model: 'Rolex Submariner',
        description: 'Часы для дайвинга с водонепроницаемостью до 300 метров.',
        image: 'https://w.wallhaven.cc/full/nm/wallhaven-nm66rk.jpg',
      },
      {
        model: 'Omega Seamaster',
        description: 'Стильные и надежные часы для активного отдыха.',
        image: 'https://w.wallhaven.cc/full/n6/wallhaven-n611e6.jpg',
      },
      {
        model: 'Tag Heuer Carrera',
        description: 'Спортивные часы с хронографом для гонщиков.',
        image: 'https://w.wallhaven.cc/full/48/wallhaven-48wwp2.jpg',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Admins', null, {});
    await queryInterface.bulkDelete('Feedbacks', null, {});
    await queryInterface.bulkDelete('Watches', null, {});
    await queryInterface.bulkDelete('Marketings', null, {});
  },
};

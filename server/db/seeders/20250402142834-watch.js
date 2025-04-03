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
        name: 'Иван Иванов',
        number: '+7 (123) 456-78-90',
        email: 'ivan.ivanov@example.com',
        comment: 'Отличный сервис!',
      },
      {
        name: 'Мария Петрова',
        number: '+7 (987) 654-32-10',
        email: 'maria.petrova@example.com',
        comment: 'Все очень понравилось!',
      },
      {
        name: 'Алексей Смирнов',
        number: '+7 (555) 123-45-67',
        email: 'alexey.smirnov@example.com',
        comment: 'Рекомендую всем!',
      },
    ]);

    await Watch.bulkCreate([
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
        image: 'https://w.wallhaven.cc/full/n6/wallhaven-n611e6.jpg',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Admins', null, {});
    await queryInterface.bulkDelete('Feedbacks', null, {});
    await queryInterface.bulkDelete('Watches', null, {});
  },
};

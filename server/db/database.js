require('dotenv').config();

module.exports = {
  development: {
    use_env_variable: 'DB_SUPABASE',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Для Supabase и других облачных БД
      },
    },
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    use_env_variable: process.env.DB_URL_PROD ? 'DB_URL_PROD' : undefined,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
    dialect: 'postgres',
  },
};

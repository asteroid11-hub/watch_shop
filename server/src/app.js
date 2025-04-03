const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');

const authRouter = require('./routes/authRouter');
const watchRouter = require('./routes/watchRouter');
const feedbackRouter = require('./routes/feedbackRouter');
const adminRouter = require('./routes/adminRouter'); // Добавленный маршрут для администратора

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

// Раздача загруженных файлов
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', authRouter);
app.use('/api/watch', watchRouter);
app.use('/api/feedback', feedbackRouter);
app.use('/api/admin', adminRouter); // Добавленный маршрут для администратора

module.exports = app;

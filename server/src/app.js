const express = require('express');
const jsxRender = require('./utils/jsxRender');

const cookieParser = require('cookie-parser');
const path = require('path');

const authRouter = require('./routes/authRouter');
const watchRouter = require('./routes/watchRouter');
const feedbackRouter = require('./routes/feedbackRouter');
const marketingRouter = require('./routes/marketingRouter');
const adminRouter = require('./routes/adminRouter'); // Добавленный маршрут для администратора

const app = express();

app.engine('js', jsxRender);
app.set('view engine', 'js');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());

app.use(cookieParser());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/uploads/watch', express.static(path.join(__dirname, '../uploads/watch')));

app.use('/uploads/feedback', express.static(path.join(__dirname, '../uploads/feedback')));

app.use(
  '/uploads/marketing',
  express.static(path.join(__dirname, '../uploads/marketing')),
);

// app.use(express.static('uploads'));

app.use('/api', authRouter);
app.use('/api/watch', watchRouter);
app.use('/api/feedback', feedbackRouter);
app.use('/api/marketing', marketingRouter);
app.use('/api/admin', adminRouter); // Добавленный маршрут для администратора

module.exports = app;

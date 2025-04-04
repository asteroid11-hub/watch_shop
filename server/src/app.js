const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');

const authRouter = require('./routes/authRouter');
const watchRouter = require('./routes/watchRouter');
const feedbackRouter = require('./routes/feedbackRouter');
const marketingRouter = require('./routes/marketingRouter');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

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

module.exports = app;

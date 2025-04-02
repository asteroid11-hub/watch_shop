const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const app = express();
const authRouter = require('./routes/authRouter');
const watchRouter = require('./routes/watchRouter');
const feedbackRouter = require('./routes/feedbackRouter');

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.use('/api', authRouter);
app.use('/api/watch', watchRouter);
app.use('/api/feedback', feedbackRouter);

module.exports = app;

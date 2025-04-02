const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const app = express();
const authRouter = require('./routes/authRouter');

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.use('/api', authRouter);

module.exports = app;

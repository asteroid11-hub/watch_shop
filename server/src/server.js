const app = require('./app');
const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(express.static(path.join(__dirname, '..', 'dist')));
// app.get('/*', (req, res) => {
// });
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));

})

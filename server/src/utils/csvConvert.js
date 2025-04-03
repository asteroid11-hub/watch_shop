const fs = require('fs');
const path = require('path');
const { parse } = require('json2csv');

function arrayToCsv(dataArray) {
  const timestamp = Math.floor(Date.now() / 1000);
  const dirPath = path.join(__dirname, '../../csv'); // Используем абсолютный путь
  const fileName = path.join(dirPath, `${timestamp}.csv`);

  try {
    // Создаем директорию, если она не существует
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const csv = parse(dataArray);
    fs.writeFileSync(fileName, csv);
    console.log(`CSV файл успешно создан: ${fileName}`);
    return fileName;
  } catch (err) {
    console.error('Ошибка при создании CSV файла:', err);
  }
}
module.exports = arrayToCsv;

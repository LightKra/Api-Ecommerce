const winston = require('winston');
const path = require("path");
require('winston-daily-rotate-file');

const transport = new winston.transports.DailyRotateFile({
  level: 'info',
  filename: path.join(__dirname, "../", "logs/","application-%DATE%.log"),
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d'
});

transport.on('error', error => {
  // log or handle errors here
});

transport.on('rotate', (oldFilename, newFilename) => {
  // do something fun
});

const logger = winston.createLogger({
  transports: [
    transport
  ]
});

module.exports = {logger}
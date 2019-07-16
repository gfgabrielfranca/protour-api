require('./dotenv');

const Url = require('url-parse');

const DATABASE_URL = new Url(process.env.DATABASE_URL);

module.exports = {
  username: process.env.DB_USER || DATABASE_URL.username,
  password: process.env.DB_PASSWORD || DATABASE_URL.password,
  database: process.env.DB_DATABASE || DATABASE_URL.pathname.substr(1),
  host: process.env.DB_HOST || DATABASE_URL.hostname,
  dialect: process.env.DB_CONNECTION,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

require('dotenv').config();

module.exports = {
  development: {
  username: process.env.MYSQLUSER || 'root',
  password: process.env.MYSQLPASSWORD || 'obayda',
  database: process.env.MYSQLDATABASE || 'fitness_time',
  host: process.env.MYSQLHOST || '127.0.0.1',
  port: process.env.MYSQLPORT || 3306,
  dialect: 'mysql',
},

  test: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'obayda',
    database: process.env.DB_NAME || 'fitness_time',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    dialect: process.env.DB_DIALECT || 'mysql',
  },

  production: {
  username: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  host: process.env.MYSQLHOST,
  port: process.env.MYSQLPORT,
  dialect: 'mysql',
},
};
const { mysql } = require('../config');

console.log({
  host: mysql.host,
  user: mysql.user,
  port: mysql.port,
  password: mysql.password,
  database: mysql.database,
  timezone: 'UTC'
});

const mysqlInstance = require('knex')({
  client: 'mysql',
  connection: {
    host: mysql.host,
    user: mysql.user,
    port: mysql.port,
    password: mysql.password,
    database: mysql.database,
    timezone: 'UTC'
  }
});

console.log('Connected to mysql successfully');

module.exports = () => {
  return mysqlInstance;
};


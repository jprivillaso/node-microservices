module.exports = {
  isTest: true,
  server: {
    port: 3000,
    host: 'localhost'
  },
  bodyParser: {
    extended: true,
    limit: '50mb'
  },
  mysql: {
    host: process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT || '3306',
    database: process.env.MYSQL_DATABASE || 'deliverydb',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'password',
    multipleStatements: true
  },
  consign: {
    verbose: false
  }
};

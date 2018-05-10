module.exports = (app) => {

  const { mysql } = app.connection;

  const findAll = async() => {
    return await mysql.table('orders').select();
  };

  return {
    findAll
  };

};

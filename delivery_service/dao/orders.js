module.exports = (app) => {

  const { mysql } = app.connection;

  const findAll = async() => {
    return await mysql.table('orders').select();
  };

  const findByStatus = async(status) => {
    return await mysql.table('orders').select().where('status', status);
  };

  return {
    findAll,
    findByStatus
  };

};

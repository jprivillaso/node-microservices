module.exports = (app) => {

  const findAll = async (app) => {
    return await app.dao.orders.findAll();
  };

  return {
    findAll
  }

};

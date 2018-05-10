module.exports = (app) => {

  const findAll = async() => {
    return new Promise(async(resolve, reject) => {
      try {
        const orders = await app.dao.orders.findAll();
        resolve(orders);
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  };

  const findByStatus = (status) => {

    return new Promise(async(resolve, reject) => {

      try {
        const orders = await app.dao.orders.findByStatus(status);
        resolve(orders);
      } catch (error) {
        console.error(error);
        reject(error);
      }

    });

  };

  return {
    findAll,
    findByStatus
  };

};

module.exports = async(app) => {

  app.get('/orders', async(req, res) => {

    try {

      const orders = await app.services.orders.findAll(app);
      res.status(200).json(orders);

    } catch (error) {
      console.log('Something bad happened:', error.message);
      res.status(500).json({
        message: error.message
      });
    }

  });

};

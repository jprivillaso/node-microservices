module.exports = async(app) => {

  app.get('/orders', async(req, res) => {

    try {

      const orders = await app.services.orders.findAll(app);
      res.status(200).json(orders);

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }

  });

  app.get('/orders/:status', async(req, res) => {

    try {

      const { status } = req.params;
      const orders = await app.services.orders.findByStatus(status);
      res.status(200).json(orders);

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }

  });

};

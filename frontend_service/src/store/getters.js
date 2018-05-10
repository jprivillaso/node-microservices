const getters = {
  getUnprocessedOrders: state => state.filter(d => !d.processed)
};

export default getters;

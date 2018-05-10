import ordersAPI from '../services/ordersAPI';

const fetchOrders = ({ commit }) => new Promise((resolve, reject) => {
  ordersAPI.findAll()
    .then((data) => {
      commit('updateOrders', {
        data
      });
      resolve(data);
    })
    .catch((reason) => {
      console.error(reason.message);
      reject();
    });
});

export default {
  fetchOrders
};

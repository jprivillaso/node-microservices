import swal from 'sweetalert';
import ordersAPI from '../services/ordersAPI';

const fetchOrders = ({ commit }, { tableName, rowData }) => new Promise((resolve, reject) => {
  ordersAPI.findAll(tableName, rowData)
    .then((data) => {
      commit('updateOrders', {
        tableName,
        data
      });

      swal('Success!', 'Table data was saved successfully!', 'success');
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

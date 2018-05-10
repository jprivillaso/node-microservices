const fetch = require('node-fetch');
const SERVICE_HOST = process.env.DELIVERY_SERVICE_HOST || 'localhost:3001';

const getNext = async() => {

  return await fetch(`http://${SERVICE_HOST}/orders/unprocessed`)
    .then(res => res.json())
    .catch(err => console.error(err));

};

module.exports = {
  getNext
};

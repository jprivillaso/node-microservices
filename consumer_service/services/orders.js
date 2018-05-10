const fetch = require('node-fetch');
const SERVICE_HOST = process.env.DELIVERY_SERVICE_HOST || 'localhost:3001';

const getNext = async() => {

  return await fetch(`http://${SERVICE_HOST}/orders/unprocessed`)
    .then(res => res.text());

};

module.exports = {
  getNext
};

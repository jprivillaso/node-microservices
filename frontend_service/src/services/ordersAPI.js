import { API_PORT, API_HOST } from '@/services/apiData';

const options = {
  method: 'GET',
  mode: 'cors',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  cache: 'default'
};

const findAll = async () => {
  try {
    const response = await fetch(`http://${API_HOST}:${API_PORT}/orders`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching all orders');
    return null;
  }
};

const findOne = async (orderId) => {
  try {
    const response = await fetch(`http://${API_HOST}:${API_PORT}/orders/${orderId}`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching single order');
    return null;
  }
};

export default {
  findAll,
  findOne
};

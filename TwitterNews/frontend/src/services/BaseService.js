import axios from 'axios';

const BaseService = {
  async get(url) {
    return axios.get(url);
  },

  async post(url, payload) {
    return axios.post(url, payload);
  },

  async delete(url, id) {
    return axios
      .delete(url, {
        data: {
          id,
        },
      });
  },
};

export default BaseService;

import axios from 'axios';

export default {
  async get(url, params) {
    return axios.get(url, params);
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

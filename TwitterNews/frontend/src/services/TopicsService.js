import BaseService from './BaseService';
import { baseURL } from '../common/config';

const TopicsService = {

  async getTopics(countryId, callback) {
    const url = `${baseURL}/topics`;
    await BaseService.get(url, {
      params: {
        countryId,
      },
    })
      .then((res) => {
        callback(res);
      }).catch((error) => {
        throw new Error(error);
      });
  },
};

export default TopicsService;

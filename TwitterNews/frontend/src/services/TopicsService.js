import BaseService from './BaseService';
import { baseURL } from '../common/config';

const TopicsService = {

  async getTopics(countryId, callback) {
    const url = `${baseURL}/topics/${countryId}`;
    await BaseService.get(url)
      .then((res) => {
        callback(res);
      }).catch((error) => {
        throw new Error(error);
      });
  },
};

export default TopicsService;

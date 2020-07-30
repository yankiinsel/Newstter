import BaseService from './BaseService';
import { baseURL } from '../common/config';

const NewsService = {
  async getNews(topic, callback) {
    const url = `${baseURL}/news/${topic}/1`;
    await BaseService.get(url)
      .then((res) => {
        callback(res);
      }).catch((error) => {
        throw new Error(error);
      });
  },
};

export default NewsService;

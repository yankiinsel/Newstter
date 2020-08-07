import BaseService from './BaseService';
import { baseURL } from '../common/config';

const NewsService = {
  async getNews(topic, page, callback) {
    const url = `${baseURL}/news`;
    await BaseService.get(url, {
      params: {
        page,
        topic,
      },
    })
      .then((res) => {
        callback(res);
      }).catch((error) => {
        throw new Error(error);
      });
  },
};

export default NewsService;

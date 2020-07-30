const config = require('../DevConfig.js');

exports.getNews = (req, res) => {
    const NewsAPI = require('newsapi');
    const newsapi = new NewsAPI(config.config.newsClient.key);
    newsapi.v2.everything({
        q: req.params.topic,
        page: req.params.page,
    }).then(data => {
        res.json(data);
    }).catch(e => {
        console.log(e);
    });
};

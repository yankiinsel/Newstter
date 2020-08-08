const config = require(process.env.NODE_ENV === "production" ? '../Config.js' : '../DevConfig.js');

exports.getNews = (req, res) => {
    const NewsAPI = require('../../libraries/newsapi');
    const newsapi = new NewsAPI(config.config.newsClient.key);
    newsapi.v2.everything({
        q: req.query.topic,
        page: req.query.page,
    }).then(data => {
        res.json(data);
    }).catch(e => {
        res.json({status: 'nok', error: e});
    });
};

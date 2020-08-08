const config = require(process.env.NODE_ENV === "production" ? '../Config.js' : '../DevConfig.js');
const Twitter = require('twitter');

exports.getTopics = (req, res) => {
    config.config.twitterClients[0].get('trends/place', { id: req.query.countryId }, (error, tweets, response) => {
        return res.json(tweets);
    });
};

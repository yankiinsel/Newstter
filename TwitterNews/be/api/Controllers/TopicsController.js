const Twitter = require('twitter');
const config = require('../DevConfig.js');

exports.getTopics = (req, res) => {
    config.config.twitterClients[0].get('trends/place', { id: req.params.id }, (error, tweets, response) => {
        return res.json(tweets);
    });
};

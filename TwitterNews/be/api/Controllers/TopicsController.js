const Twitter = require('twitter');
const config = require('../Config.js');

exports.getTopics = (req, res) => {
    config.config.twitterClients[0].get('trends/place', { id: req.query.countryId }, (error, tweets, response) => {
        return res.json(tweets);
    });
};

const Twitter = require('twitter');
const config = require('../Config.js');


exports.getTopics = (req, res) => {
    config.twitterClients[0].get('trends/place', { id: req.params.id }, (error, tweets, response) => {
        if (error) config.twitterClients.push(config.twitterClients.shift());
        return res.json(tweets);
    });
};

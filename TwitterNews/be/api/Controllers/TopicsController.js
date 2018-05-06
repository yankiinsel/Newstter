const Twitter = require('twitter');
const config = require('../config');


exports.getTopics = (req, res) => {
    config.twitterClient.get('trends/place', { id: req.params.id }, (error, tweets, response) => {
        if (error) console.log(error);
        return res.json(tweets);
    });
};

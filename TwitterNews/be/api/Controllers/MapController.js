const config = require('../Config.js');
const Twitter = require('twitter');

exports.getAvailableTrends = (req,res) => {
    config.twitterClients[0].get('trends/available', (error, tweets, response) => {
        return res.json(tweets); 
    });
}

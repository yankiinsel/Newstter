const Twitter = require('twitter');

const client = new Twitter({
    consumer_key: 'qfO1Uum6sc6jZSL5pfBwbKYyp',
    consumer_secret: 'ygkFHchUOnjAfaNwaEnz6NiwnR7t20yDp8x7G5ZAA1yzYfw6Fz',
    access_token_key: '415738851-vqu0oeUqvMHsVAySKDWyeEuwlo5FAcQkOC1hKzUb',
    access_token_secret: 'Q5GZU6OjIVw6JhEj9mVNuN7S5SLenpJqQSA3YCYPpvAhh',
});

exports.getTopics = (req, res) => {
    client.get('trends/place', { id: req.params.id }, (error, tweets, response) => {
        if (error) console.log(error);
        return res.json(tweets);
    });
};

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Twitter = require('twitter');
const PORT = process.env.PORT || 3001;

const app = express();

const client = new Twitter({
  consumer_key: 'qfO1Uum6sc6jZSL5pfBwbKYyp',
  consumer_secret: 'ygkFHchUOnjAfaNwaEnz6NiwnR7t20yDp8x7G5ZAA1yzYfw6Fz',
  access_token_key: '415738851-vqu0oeUqvMHsVAySKDWyeEuwlo5FAcQkOC1hKzUb',
  access_token_secret: 'Q5GZU6OjIVw6JhEj9mVNuN7S5SLenpJqQSA3YCYPpvAhh',
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/trends/available', (req, res) => {
  client.get('trends/available', (error, tweets, response) => {
    if (error) console.log(error);
    return res.json(tweets);  // The favorites.
    //console.log(response);  // Raw response object.
  });
});

app.get('/trends/place/:id', (req, res) => {
  client.get('trends/place', { id: req.params.id }, (error, tweets, response) => {
    if (error) console.log(error);
    return res.json(tweets);  // The favorites.
    //console.log(response);  // Raw response object.
  });
});

app.listen(PORT, () => console.log('App running @' + PORT));

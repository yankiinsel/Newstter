const Twitter = require('twitter');

exports.config = {
    
    twitterClients: [new Twitter({
            consumer_key: process.env.consumer_key,
            consumer_secret: process.env.consumer_secret,
            access_token_key: process.env.access_token_key,
            access_token_secret: process.env.access_token_secret,
        }),
    ],

      newsClient: {
          key: process.env.key,
      },
  
};
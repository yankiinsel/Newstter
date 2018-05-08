const config = require('../config');

function getData(req, callbackData) {

    const https = require('https');

    let response_handler = function (response) {

        let body = '';
        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {
            callbackData(JSON.parse(body));
            console.log('\nRelevant Headers:\n');
            for (var header in response.headers)
                // header keys are lower-cased by Node.js
                if (header.startsWith("bingapis-") || header.startsWith("x-msedge-"))
                    console.log(header + ": " + response.headers[header]);
            body = JSON.stringify(JSON.parse(body), null, '  ');
            console.log('\nJSON Response:\n');
            console.log(body);
        });
        response.on('error', function (e) {
            console.log('Error: ' + e.message);
        });

    };

    let bing_news_search = function (search, country) {
        let options = `&mkt=${country}`;
        let request_params = {
            method: 'GET',
            hostname: config.newsClient.host,
            path: config.newsClient.path + '?q=' + encodeURIComponent(search) + options,
            headers: {
                'Ocp-Apim-Subscription-Key': config.newsClient.subscriptionKey,
            }
        };

        let req = https.request(request_params, response_handler);
        req.end();

    }

    bing_news_search(req.params.term, req.params.country);
}

exports.getNews = (req, res) => {
    getData(req, function(data){
        return res.json(data);
    });
};

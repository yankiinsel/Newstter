
function getData(req, callbackData) {

    const https = require('https');

    const newsClient = {
        host: 'api.cognitive.microsoft.com',
        path: '/bing/v7.0/news/search',
        subscriptionKey: '6060d2f256784f3d89addff2a4d16b3a',
        key2: '4ae060fb3d4945f8a5ab36e2c1768787',
    }


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

    let bing_news_search = function (search) {
        let options = '&en-ca'
        let request_params = {
            method: 'GET',
            hostname: newsClient.host,
            path: newsClient.path + '?q=' + encodeURIComponent(search) + options,
            headers: {
                'Ocp-Apim-Subscription-Key': newsClient.subscriptionKey,
            }
        };

        let req = https.request(request_params, response_handler);
        req.end();

    }

    bing_news_search(req.params.term);
}

exports.getNews = (req, res) => {
    getData(req, function(data){
        return res.json(data);
    });
};

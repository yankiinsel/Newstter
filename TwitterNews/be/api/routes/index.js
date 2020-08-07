module.exports = (app, router) => {
    // Bind the controller to the route
    const mapController = require('../Controllers/MapController.js');
    const topicsController = require('../Controllers/TopicsController.js');
    const newsController = require('../Controllers/NewsController.js');

    router.get('/', (req, res) => { 
        res.json({
            'hello': 'hi'
        })
    })

    router.get('/map', mapController.getAvailableTrends)
    router.get('/topics', topicsController.getTopics)
    router.get('/news', newsController.getNews)

    app.use('/.netlify/functions/app', router);
};
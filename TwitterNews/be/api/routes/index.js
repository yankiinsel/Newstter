module.exports = (app) => {
    // Bind the controller to the route
    const mapController = require('../Controllers/MapController.js');
    const topicsController = require('../Controllers/TopicsController.js');
    const newsController = require('../Controllers/NewsController.js');


    app.route('/map')
        .get(mapController.getAvailableTrends)

    app.route('/topics/')
        .get(topicsController.getTopics)

    app.route('/news/')
        .get(newsController.getNews)
        
};
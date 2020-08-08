module.exports = (app, router) => {
    // Bind the controller to the route
    const topicsController = require('../Controllers/TopicsController.js');
    const newsController = require('../Controllers/NewsController.js');

    router.get('/', (req, res) => { 
        res.json({
            'hello': 'hi'
        })
    })

    router.get('/topics', topicsController.getTopics)
    router.get('/news', newsController.getNews)

    app.use('/.netlify/functions/app', router);
};
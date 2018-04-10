const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const routes = require('./api/routes/index.js'); // Importing route definitions

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Binding our routes with the server instance
routes(app);

app.listen(PORT, () => console.log('App running @' + PORT));

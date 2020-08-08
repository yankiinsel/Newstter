const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 3001;
const routes = require('./api/routes/index.js'); // Importing route definitions

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Binding our routes with the server instance
routes(app, router);

module.exports.handler = serverless(app);

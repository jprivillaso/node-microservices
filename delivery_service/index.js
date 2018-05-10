'use strict';

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const consign = require('consign');
const compression = require('compression');
const cors = require('cors');
const http = require('http');
const swaggerTools = require('swagger-tools');

// Import config vars
const config = require('./config.js');

const app = express();

// load settings from environment config
const { NODE_ENV } = process.env || 'development';

// log all requests
app.use(morgan('combined'));

// support json and url encoded requests
app.use(bodyParser.urlencoded(config.bodyParser));
app.use(bodyParser.json(config.bodyParser));
app.use(bodyParser.raw(config.bodyParser));
app.use(compression());

// setup encrypted session cookies
app.use(cookieParser());
app.use(cors());

// statically serve from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'html');

consign(config.consign)
  .include('connection')
  .then('dao')
  .then('routes')
  .then('services')
  .into(app);

const serverPort = process.env.CONTAINER_PORT || 80;

// Swagger router configuration
const options = {
  controllers: './routes',
  useStubs: process.env.NODE_ENV === 'development' ? true : false // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
const swaggerDoc = require('./swagger/swagger.json');

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function(middleware) {
  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());

  // Start the server
  http.createServer(app).listen(serverPort, async() => {

    console.log(`Your server is listening at http://localhost:${serverPort}`);
    console.log(`You can access the Swagger API at http://localhost:${serverPort}/docs`);
    console.log(`You are running the app in ${NODE_ENV} mode`);

  });

});

module.exports = app;

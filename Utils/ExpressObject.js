const express = require('express');
const bodyParser = require('body-parser');
const commonFunctions = require('../Utils/CommonFunctions')
const statusCodes = require('../Utils/StatusCodes')
const app = express();
const cors = require('cors');
app.use(cors())
app.use(express.json());

// Error handling middleware
app.use((err, req, res,next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      const errorResponse = commonFunctions.generateErrorObject(statusCodes.badRequest, "Invalid JSON format");
      return res.status(statusCodes.badRequest).send(errorResponse);
    }
    next(err); // Pass the error to the default Express error handler
  });
  
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

module.exports = app;
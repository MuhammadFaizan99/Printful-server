// ghlRoute.js

const express = require("express");
const ghlRouter = express.Router();

ghlRouter.get('/initiate', require('../controller/initiate'));

ghlRouter.get('/refresh', require('../controller/refresh'));

ghlRouter.get('/oauth/callback', require('../controller/callback'));

module.exports = { ghlRouter };

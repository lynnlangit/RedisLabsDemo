var express = require("express");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require("path");

var redisCloud = require('./services/redis-cloud');
var router = require('./users/users.routes');

var app = express();

// Use RedisCloud as the session store...
redisCloud.createSessionStore(app);

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);

app.use(cookieParser("secretSign#143_!223"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', router);

module.exports = app;
var redis = require("redis");
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var debug = require('debug')('RedisLabSession:server');

module.exports.createSessionStore = function (app) {

    var redisClient = redis.createClient(
        process.env.REDIS_PORT,
        process.env.REDIS_HOST,
        {no_ready_check: true});

    redisClient.on('connect', function () {
        debug('Connected to Redis');
    });

    redisClient.auth(process.env.REDIS_PASS, function (err) {
        if (err) throw err;
    });

    // IMPORTANT
    // Here we tell Express to use our RedisLab instance as session store.
    // We pass the Redis Cloud client that we create
    app.use(session({
        secret: '<yourRedisLabsRedisCloudSecretKeyValue>',
        store: new RedisStore({client: redisClient}),
        saveUninitialized: false,
        resave: false
    }));
};
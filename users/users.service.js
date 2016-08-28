var AzureSql = require('../services/AzureSql');

function prepareParameters(req) {
    var params = {};

    if (req.body) {
        params.email = req.body.user_email;
        params.name = req.body.user_name;
        params.password = req.body.user_password;
        params.status = req.body.status;
    }

    if (req.session && req.session.key) {
        params.userId = req.session.key['user_id'];
    }

    return params;
}

function createDb() {
    var sqlConfig = {
        userName: process.env.SQL_USER,
        password: process.env.SQL_PASS,
        server: process.env.SQL_HOST,
        options: {encrypt: true, database: 'redis-labs-demo'}
    };

    return new AzureSql(sqlConfig);
}

function selectQuery(sql, type) {
    var method;

    if (type === 'checkEmail') {
        method = sql.checkEmail.bind(sql);
    } else if (type === 'register') {
        method = sql.register.bind(sql);
    } else if (type === 'login') {
        method = sql.login.bind(sql);
    } else if (type === 'getStatus') {
        method = sql.getStatus.bind(sql);
    } else if (type === 'addStatus') {
        method = sql.addStatus.bind(sql);
    }

    return method;
}

function queryDb(req, type, callback) {
    var sql = createDb();

    var method = selectQuery(sql, type);
    if (!method) {
        console.log(type);
        return;
    }

    var params = prepareParameters(req);
    method(params, callback);
}

module.exports = queryDb;
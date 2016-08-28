var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var debug = require('debug')('RedisLabSession:server');

module.exports = function () {
    'use strict';

    var AzureSql = function (config) {
        this.config = config;
    };

    AzureSql.prototype.addStatus = function (params, callback) {
        this.connect(function (connection) {
            debug('Adding status for user ' + params.userId);
            var query = `INSERT into user_status(user_id,user_status) VALUES (@id,@status)`;
            var request = new Request(query, function (err, rowCount) {
                if (err) {
                    throw err;
                }
                callback({addedStatus: 0 < rowCount});
            });

            request.addParameter('id', TYPES.Int, params.userId);
            request.addParameter('status', TYPES.NVarChar, params.status);

            connection.execSql(request);
        })
    };

    AzureSql.prototype.checkEmail = function (params, callback) {
        this.connect(function (connection) {
            debug('Checking for user ' + params.email);
            var query = `SELECT * from user_login WHERE user_email=@email`;
            var request = new Request(query, function (err, rowCount) {
                if (err) {
                    throw err;
                }
                callback({userExists: 0 < rowCount});
            });

            request.addParameter('email', TYPES.NVarChar, params.email);

            connection.execSql(request);
        });
    };

    AzureSql.prototype.getStatus = function (params, callback) {
        this.connect(function (connection) {
            debug('Getting statuses for ' + params.userId);
            var query = `SELECT * FROM user_status WHERE user_id=@id`;

            var statuses = [];
            var request = new Request(query, function (err, rowCount) {
                if (err) {
                    throw err;
                }
                callback({hasStatus: 0 < rowCount, statuses: statuses});
            });

            request.on('row', function (columns) {
                var status = {};
                columns.forEach(function (c) {
                    status[c.metadata.colName] = c.value;
                });
                statuses.push(status);
            });

            request.addParameter('id', TYPES.Int, params.userId);

            connection.execSql(request);
        });
    };

    AzureSql.prototype.login = function (params, callback) {
        this.connect(function (connection) {
            debug('Logging in ' + params.email);
            var query = `SELECT * from user_login WHERE user_email=@email AND user_password=@password`;

            var user;

            var request = new Request(query, function (err, rowCount) {
                if (err) {
                    throw err;
                }
                callback({loggedIn: 0 < rowCount, user: user});
            });

            request.on('row', function (columns) {
                user = {};
                columns.forEach(function (c) {
                    user[c.metadata.colName] = c.value;
                })
            });

            request.addParameter('email', TYPES.NVarChar, params.email);
            request.addParameter('password', TYPES.NVarChar, params.password);

            connection.execSql(request);
        });
    };

    AzureSql.prototype.register = function (params, callback) {
        this.connect(function (connection) {
            debug('Registering user ' + params.name);
            var query = `INSERT into user_login(user_email,user_password,user_name) VALUES (@email,@password,@name)`;

            var request = new Request(query, function (err, rowCount) {
                if (err) {
                    throw err;
                }
                callback({createdUser: 0 < rowCount});
            });

            request.addParameter('email', TYPES.NVarChar, params.email);
            request.addParameter('password', TYPES.NVarChar, params.password);
            request.addParameter('name', TYPES.NVarChar, params.name);

            connection.execSql(request);

        })
    };

    AzureSql.prototype.connect = function (command) {
        var connection = new Connection(this.config);
        connection.on('connect', function (err) {
            if (err) {
                throw err;
            }

            debug("Connected to Azure SQL");
            command(connection);
        });
    };

    return AzureSql;
}();
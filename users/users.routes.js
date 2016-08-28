var express = require('express');
var queryDb = require('./users.service');

var router = express.Router();

router.get('/', function (req, res) {
    res.render('index.html');
});

router.post('/login', function (req, res) {
    queryDb(req, "login", function (response) {
        if (response === null) {
            res.json({"error": "true", "message": "Database error occured"});
        } else {
            if (!response.loggedIn) {
                res.json({
                    "error": "true",
                    "message": "Login failed ! Please register"
                });
            } else {
                req.session.key = response.user;
                res.json({"error": false, "message": "Login success."});
            }
        }
    });
});

router.get('/home', function (req, res) {
    if (req.session.key) {
        res.render("home.html", {email: req.session.key["user_name"]});
    } else {
        res.redirect("/");
    }
});

router.get("/fetchStatus", function (req, res) {
    if (req.session.key) {
        queryDb(req, "getStatus", function (response) {
            if (!response.hasStatus) {
                res.json({"error": false, "message": "There is no status to show."});
            } else {
                res.json({"error": false, "message": response.statuses});
            }
        });
    } else {
        res.json({"error": true, "message": "Please login first."});
    }
});

router.post("/addStatus", function (req, res) {
    if (req.session.key) {
        queryDb(req, "addStatus", function (response) {
            if (response.addedStatus) {
                res.json({"error": false, "message": "Status is added."});
            } else {
                res.json({"error": false, "message": "Error while adding Status"});
            }
        });
    } else {
        res.json({"error": true, "message": "Please login first."});
    }
});

router.post("/register", function (req, res) {
    queryDb(req, "checkEmail", function (response) {
        if (response.userExists) {
            res.json({"error": true, "message": "This email is already present"});
        } else {
            queryDb(req, "register", function (response) {
                if (!response.createdUser) {
                    res.json({"error": true, "message": "Error while adding user."});
                } else {
                    res.json({"error": false, "message": "Registered successfully."});
                }
            });
        }
    });
});

router.get('/logout', function (req, res) {
    if (req.session.key) {
        req.session.destroy(function () {
            res.redirect('/');
        });
    } else {
        res.redirect('/');
    }
});

module.exports = router;
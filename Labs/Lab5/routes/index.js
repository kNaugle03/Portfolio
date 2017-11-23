var express = require('express');
var router = express.Router();
var builtin = require('builtin-modules');
var isbuiltin = require('is-builtin-module');
var validator = require('validator');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/Chinook.sqlite');


/* GET home page. */
router.get('/', function(req, res, next) {


    res.render('index', { title: 'Express', modules: builtin, bool: isbuiltin('foo'),
                        valid1: validator.isEmail('foo.bar'), valid2: validator.isEmail('jimmy@gmail.com'),
                        thisthat: validator.equals('this', 'that')});
});

router.get('/db', function(req, res, next) {
    db.all('SELECT * from album limit 0, 25',
        function (err, row) {
            if (err)
                console.log("Error Selecting : %s ", err);
            res.json(row);
        })
});

module.exports = router;

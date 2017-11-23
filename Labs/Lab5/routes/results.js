var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/Chinook.sqlite');

router.get('/', function(req, res, next){
   res.send("It works!");
});

router.get('/db', function(req, res, next) {
    db.all("SELECT * from album LIMIT 0, 25",
        function (err, rows) {
            if (err)
                console.log("Error Selecting : %s ", err);
            res.json(rows);
        });
});

module.exports = router;
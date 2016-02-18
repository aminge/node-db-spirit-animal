var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connectionString = require('./connect');

var nameArray = [];

router.get('/', function(req, res) {
    res.send(nameArray);
});

router.post('/', function(req, res) {

    var addPerson = {
        first_name: req.body.first_name,
        last_name: req.body.last_name
    };

    pg.connect(connectionString, function(err, client, done) {
        client.query("INSERT INTO people (first_name, last_name) VALUES ($1, $2) RETURNING person_id",
            [addPerson.first_name, addPerson.last_name],
            function (err, result) {
                done();
                if(err) {
                    console.log('Error inserting data: ', err);
                    res.send(false);
                } else {
                    addPerson.id = result.rows[0].person_id;
                    res.send(addPerson);
                }
            });
    });
});

module.exports = router;
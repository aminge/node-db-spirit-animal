var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res) {
    res.send({message: 'hello'});
});

router.post('/', function(req, res) {
    console.log(req.body);
    res.send(req.body);
});

module.exports = router;
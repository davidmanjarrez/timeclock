const express = require('express');
const router = express.Router();
const runQuery = require('../pgHelper');
const createResponseObject = require('../responseHelper');


router.get('/', function(req, res, next) {
    runQuery('SELECT * FROM allowed_status_action').then(result => {
        res.json(createResponseObject(result, true, ""));
    }).catch(error => {
        res.json(createResponseObject(null, false, error));
    })
});

module.exports = router;



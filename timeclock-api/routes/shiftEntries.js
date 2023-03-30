const express = require('express');
const router = express.Router();
const createResponseObject = require('../responseHelper');
const getByEmployee = require("../services/shiftEntryService").getByEmployee;
const changeStatus = require("../services/shiftEntryService").changeStatus;


router.post('/statusChange', function(req, res, next) {
  changeStatus(req.body.employeeId, req.body.actionKey).then((result) => {
    res.json(createResponseObject(null, true, ""));
  }).catch((error) => {
    res.json(createResponseObject(null, false, "error"));
  });
});

router.get('/:employeeNumber/shiftEntries/:page', function(req, res, next) {
  console.debug("shiftEntries");
  getByEmployee({pageSize: 10, pageNumber: req.params.page}, req.params.employeeNumber).then((result) => {
    console.debug(result);
    res.json(createResponseObject(result, true, ""));
  }).catch((error) => {
    res.json(createResponseObject(null, false, error));
  })
});

module.exports = router;
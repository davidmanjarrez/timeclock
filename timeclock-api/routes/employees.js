const express = require('express');
const router = express.Router();
const employeeService = require('../services/employeeService');
const getAll = employeeService.getAll;
const getById = employeeService.getById;
const registerNew = employeeService.registerNew;
const createResponseObject = require('../responseHelper');


router.post('/registration', function(req, res, next) {

  const newEmployee = {
    lastName: req.params.lastName,
    firstName: req.params.firstName,
    employeeId: req.params.employeeId
  };

  console.debug("new employee object: " + newEmployee);

  registerNew(newEmployee).then((results) => {
    res.json(createResponseObject(results, true, ""));
  }).catch((error) => {
    res.json(createResponseObject(null, false, error));
  })
});

router.get('/all/:pageNumber', function(req, res, next) {
  console.debug("in get all");
  getAll({pageNumber: req.params.pageNumber, pageSize: 10}).then((results) => {
    res.json(createResponseObject(results, true, ""));
})

router.get('/:employeeNumber', function(req, res) {
  console.debug("employee number: " + req.params.id);
  getById(req.params.employeeNumber).then((result) => {
    res.json(createResponseObject(result, true, ""));
  })
});


module.exports = router;
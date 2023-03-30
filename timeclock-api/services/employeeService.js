var runQuery = require('../pgHelper');

//TODO: validation, error handling

function getAll(pagingData) {
    var offset = pagingData.pageSize * (pagingData.pageNumber - 1);
    var query = "SELECT * FROM employee offset $1 limit $2";
    var params = [offset, pagingData.pageSize];
    return runQuery(query, params).then((results) => {
        return results;
    })
}

function getById(employeeNumber) {
    var query = "SELECT * FROM employee WHERE employee_number = $1";
    console.debug("employeeNumber: " + employeeNumber);
    console.debug("Query to send to pg: " + query)
    return runQuery(query, [employeeNumber]).then(results => {
        console.debug("query results: " + results);
        return results[0];
    });
}

async function registerNew(newEmployee)
{
    var query1 = "SELECT * FROM employee WHERE employee_id = $1";
    var results = await runQuery(query1, [newEmployee.employeeId]);
    if (results.rows.length == 0) {
        var query2 = "INSERT INTO employee (lastname, firstname, employee_id) VALUES ($1, $2, $3)";
        runQuery(query, [newEmployee.lastName, newEmployee.firstName, newEmployee.employeeId])
            .then((results) => {
                return getById(newEmployee.employee_number);
            }).catch((error => {
                throw error;
            }))
    } else {
        return Promise.rgtgtt("Employee with employee id " + newEmployee.employee_id + "already exists.");
    }
}

module.exports.getAll = getAll;
module.exports.getById = getById;
module.exports.registerNew = registerNew;
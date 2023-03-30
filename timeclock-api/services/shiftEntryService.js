var runQuery = require('../pgHelper');

//TODO: abstract out table names and common query logic

function changeStatus(employeeId, actionKey) {
    switch(actionKey) {
        case "startshift": return beginShift(employeeId);
        case "startnonmealbreak": return beginBreak(employeeId, "nonmealbreak");
        case "startmealbreak": return beginBreak(employeeId, "mealbreak");
        case "endnonmealbreak": return endBreak(employeeId);
        case "endmealbreak": return endBreak(employeeId);
        case "endshift": return endshift(employeeId);
        default: return Promise.reject("Invalid action key");
    }
}

async function getByEmployee(pagingData, employeeNumber) {
    //TODO: Transactions, parameter validation, refactor this garbage

    console.debug("getByEmployee employeeNumber: " + employeeNumber);

    const empIdQuery = "SELECT id FROM employee WHERE employee_number = $1";
    const employeeResult = await runQuery(empIdQuery, [employeeNumber]);
    const employeeId = employeeResult.rows[0].id;

    //console.debug("getByEmployee employeeId: " + employeeId);

    // get shift entries
    const offset = pagingData.pageSize * (pagingData.pageNumber - 1);
    const shiftEntryQuery = "SELECT * FROM shift_entry WHERE employee_id = $1 offset $2 limit $3";
    console.debug(shiftEntryQuery);
    const shiftEntryParams = [employeeId, offset, pagingData.pageSize];
    const entryResults = await runQuery(shiftEntryQuery, shiftEntryParams);

    console.debug("got entry results"); console.log(res);
    const entryIds = entryResults.rows.map((shiftEntry) => {
        console.debug("shift entry id: " + shiftEntry.id);
        shiftEntry.id;
    })

    console.debug("entryIds :" + entryIds);

    // get status changes
    const statusChangeQuery = "SELECT ssc.* " +
        "sa.label as action, " +
        "ss.label as status " +
    "FROM " +
    "shift_entry se JOIN " +
    "shift_status_change ssc ON se.id = ssc.shift_entry_id JOIN " +
    "shift_status ss ON ssc.shift_status_id = ss.id JOIN " +
    "status_action sa ON ssc.status_action_id = sa.id " +
    "WHERE se.id IN ($1) " +
    "ORDER BY shift_start, status_start, status_end, shift_end;";
    const statusChangeParams = [entryIds.join(",")];

    const statusResults = await runQuery(statusChangeQuery, statusChangeParams)

    console.debug(statusResults);

    const results = entryResults;

    entryResults.rows.forEach((i, e) => {
        results[i].shift_status_changes = statusResults.filter(sc => sc.shift_status_id = e.id);
    })
    console.debug(entryResults);

    return Promise.resolve(entryResults);
}

async function beginShift(employeeId) {
    const changeTimes = getChangeTimes();

    const lastStatus = getLastStatusChange(employeeId);

    if(lastStatus.label === "notworking") {
        //update last status
        await endLastStatus(employeeId, changeTimes[0]);

        //Insert new shift entry
        const insertNewEntry = "INSERT INTO shift_entry (employee_id, shift_start) VALUES ($1, $2, $3)";
        const insertNewParams = [empoyeeId, changeTimes[1]];
        await runQuery(insertNewEntry, insertNewParams);
        const currentShift = getLatestShiftEntry(employeeId);

        //Insert new status change
        insertNewStatusChange(currentShift.id, "startshift", "working", changeTimes[1]);

        Promise.resolve(true);
    } else {
        Promise.reject("Shift is laready in progress.");
    }
}

async function endShift(employeeId) {
    const changeTimes = getChangeTimes();
    const lastStatus = await getLastStatusChange(emloyeeId)

    if(lastStatus.label == "working") {
        //update last status
        await endLastStatus(employeeId, changeTimes[0]);

        //Update current shift entry
        const updateShiftQuery = "UPDATE shift_entry SET shift_end = $1";
        const updateShiftParams = [changeTimes[0]];;
        await runQuery(updateShiftQuery, updateShiftParams);

        //Insert new status change
        insertNewStatusChange(lastStatus.shift_id, "endshift", "notworking", changeTimes[1]);

        return Promise.resolve(true);
    } else {
        return Promise.reject("Shift is not in progress.");
    }
}

async function beginBreak(employeeId, statusKey) {
    if(statusKey != "nonmealbreak" || statusKey != "mealbreak") {
        Promise.reject("Invalid status");
    }

    const changeTimes = getChangeTimes();

    //Update previous status
    endLastStatus(employeeId, changeTimes[0]);

    //Get current shift
    getCurrentShift(employeeId);

    //Insert new status change
    insertNewStatusChange(curShift.id, statusKey, changeTimes[1]);

    return Promise.resolve(true);
}

async function endBreak(employeeId) {
    const lastStatus = await getLastStatusChange(employeeId);

    if(lastStatus.key !== "nonmealbreak" || lastStatus.key !== "mealbreak") {
        Promise.reject("Invalid status change");
    }
    const changeTimes = getChangeTimes();

    if(lastStatus.key === "nonmealbreak")
        const actionKey = "endnonmealbreak";
    else
        const actionKey = "endmealbreak";

    //Update previous status
    endLastStatus(employeeId, changeTimes[0]);

    //Get current shift
    const curShift = getCurrentShift(employeeId);

    //Insert new status change
    insertNewStatusChange(curShift.id, actionKey, "working", changeTimes[1]);

    return Promise.resolve(true);
}

async function getCurrentShift(emloyeeId) {
    const curShiftQuery = "SELECT * FROM shift_entry WHERE employee_id = $1 ORDER BY shift_start DESC TOP 1";
    const curShiftParams = [employeeId];
    const curShift = (await runQuery(curShiftQuery, params)).rows[0];

    return curShift;
}

function insertNewStatusChange(shiftId, actionKey, statusKey, timeStart) {
    const newStatusAction = getActionByKey("startshift");
    const newStatus = getStatusByKey("working");
    const insertNewStatus = "INSERT INTO status_change (shift_id, action_id, status_id, status_start) VALUES ($1, $2, $3, $4)";
    const insertNewStatusParams = [shiftId, actionKey, statusKey, timeStart];
}

//TODO: The reference table queries can be abstracted out

async function getStatusByKey(statusKey) {
    const statusQuery = "SELECT * FROM shift_status WHERE key = $1";
    const params = [statusKey];
    return await (runQuery(statusQuery, params)).rows[0];
}

async function endLastStatus(employeeId, endTime) {
    const lastStatus = getLastStatusChange(employeeId);
    const updateLastQuery = "UPDATE status_change SET status_end = to_timestamp($1) WHERE id = $2";
    const updateLastParams = [endTime, lastStatus.id];

    await runQuery(updateLastQuery, updateLastParams);
}

async function getActionByKey(actionKey) {
    const actionQuery = "SELECT * FROM shift_action WHERE key = $1";
    const params = [actionKey];
    return await (runQuery(actionQuery, params)).rows[0];
}

async function getLastStatusChange(employeeId) {
    const lastStatusQuery = "SELECT sc.*, ss.key from status_change sc JOIN " +
        "shift_entry se ON sc.shift_entry_id = se.id JOIN " +
        "shift_status ss ON sc.status_id = ss.id " +
        "WHERE se.employee_id = $1 " +
        "ORDER BY sc.status_end DESC LIMIT 1";
    const params = [employeeId];

    return (await runQuery(lastStatusQuery, params)).rows[0];

}

async function getLatestShiftEntry(employeeId) {
    const lastShiftQuery = "SELECT * FROM shift_entry WHERE employee_id = $1";
    const params = [employeeId];

    return (await runQuery(lastShiftQuery, params)).rows[0];
}

function getChangeTimes() {
    return [Date.now() / 1000, (Date.now() + 1000) / 1000];
}

module.exports.getByEmployee = getByEmployee;
module.exports.changeStatus = changeStatus;
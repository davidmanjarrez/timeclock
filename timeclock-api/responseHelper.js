function createResponseObject(data, success, msg) {
    return {
        "data": data,
        "success": success,
        "message": msg
    }
}

function createNoDataResponseObject(success, msg) {
    return {
        "success": success,
        "message": msg
    }
}

module.exports = createResponseObject, createNoDataResponseObject;
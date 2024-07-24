
function generateErrorObject(status, error) {
    const errorObj = {
        message: "Failure",
        status: status,
        errors: error
    }
    return errorObj;
}


const commonFunctions = {
    generateErrorObject: generateErrorObject,
}

module.exports = commonFunctions;
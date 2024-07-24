const app = require('../../Utils/ExpressObject');
const { postBase, productName, version } = require('../../Config/Config');
const { moduleName } = require('./BookConfig');
const statusCodes = require('../../Utils/StatusCodes');
const Book = require('../../Schema/Book');
const { default: mongoose } = require('mongoose');

const apiEndpoint = `${postBase}${productName}${version}${moduleName}getallbooks`;

function getallbooks() {
    app.get(apiEndpoint, async (req, res) => {
        try {
      
        const errors = []

    
        // Check if the book exists
        const bookDetails = await Book.find({})
        if(!bookDetails) errors.push("No book data found")

        if (errors.length > 0) {
            return res.status(statusCodes.badRequest).send({
                message: "Failure",
                status: statusCodes.badRequest,
                errors
            });
        }

        return res.status(statusCodes.success).send({
            responseJson: {
                statusCode: statusCodes.success,
                status: "success",
                message: "Book fetched successfully",
                bookDetails: bookDetails
            }
        });
        } catch (error) {
            const errorResponse = commonFunctions.generateErrorObject(statusCodes.internalServerError, "Internal Server Error");
            return res.status(statusCodes.internalServerError).send(errorResponse);
        }
    });
}

module.exports = getallbooks;
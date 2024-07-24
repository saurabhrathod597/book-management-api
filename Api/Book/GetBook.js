const app = require('../../Utils/ExpressObject');
const { postBase, productName, version } = require('../../Config/Config');
const { moduleName } = require('./BookConfig');
const statusCodes = require('../../Utils/StatusCodes');
const Book = require('../../Schema/Book');
const commonFunctions = require('../../Utils/CommonFunctions');
const validation = require('../../Utils/Validation');
const { default: mongoose } = require('mongoose');

const apiEndpoint = `${postBase}${productName}${version}${moduleName}getbook`;

function getbook() {
    app.get(apiEndpoint, async (req, res) => {
        try {
        let bookId = req.query.bookId;
        const errors = []

        //check if bookId is correct from query params

        const ifBookIdInvalid = validation.validateBookId(bookId)
        if (ifBookIdInvalid) errors.push(ifBookIdInvalid)
        
            // Check if the book exists
        else if (!await Book.findById(new mongoose.Types.ObjectId(bookId))) errors.push("Book not found")

        if (errors.length > 0) {
            return res.status(statusCodes.badRequest).send({
                message: "Failure",
                status: statusCodes.badRequest,
                errors
            });
        }

        const bookDetails = await Book.findOne(new mongoose.Types.ObjectId(bookId));

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

module.exports = getbook;
const app = require('../../Utils/ExpressObject');
const { postBase, productName, version } = require('../../Config/Config');
const { moduleName } = require('./BookConfig');
const statusCodes = require('../../Utils/StatusCodes');
const Book = require('../../Schema/Book');
const commonFunctions = require('../../Utils/CommonFunctions');
const validation = require('../../Utils/Validation')

const apiEndpoint = `${postBase}${productName}${version}${moduleName}deletebook`;

function deletebook() {
    app.delete(apiEndpoint, async (req, res) => {
        try {
            const bookId = req.query.bookId;
            const errors = []

            //check if bookId is correct from query params
            const ifBookIdInvalid = validation.validateBookId(bookId)
            if (ifBookIdInvalid) errors.push(ifBookIdInvalid)

            // Check if the book exists
            else if (!await Book.findById(bookId)) errors.push("Book not found")

            if (errors.length > 0) {
                return res.status(statusCodes.badRequest).send({
                    message: "Failure",
                    status: statusCodes.badRequest,
                    errors
                });
            }


            // Delete the book
            const bookDetails = await Book.findByIdAndDelete(bookId);


            return res.status(statusCodes.success).send({
                responseJson: {
                    statusCode: statusCodes.success,
                    status: "success",
                    message: "Book deleted successfully",
                    bookDetails: bookDetails
                }
            });
        } catch (error) {
            const errorResponse = commonFunctions.generateErrorObject(statusCodes.internalServerError, "Internal Server Error");
            return res.status(statusCodes.internalServerError).send(errorResponse);
        }
    });
}

module.exports = deletebook;

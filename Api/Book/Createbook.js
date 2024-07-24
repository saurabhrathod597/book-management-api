const app = require('../../Utils/ExpressObject');
const { postBase, productName, version } = require('../../Config/Config');
const { moduleName } = require('./BookConfig');
const statusCodes = require('../../Utils/StatusCodes');
const Book = require('../../Schema/Book');
const commonFunctions = require('../../Utils/CommonFunctions');
const validation = require('../../Utils/Validation');
const apiEndpoint = `${postBase}${productName}${version}${moduleName}createbook`;

function createbook() {
    app.post(apiEndpoint, async (req, res) => {
        try {
            const { name, img, summary } = req.body.bookDetails;

            // Backend validations for more reliability
            let errors = [
                validation.validateEmptyAndRequired(name) ? validation.validateEmptyAndRequired(name) + "name" : null,
                validation.validateEmptyAndRequired(img) ? validation.validateEmptyAndRequired(img) + "img" : null,
                validation.validateEmptyAndRequired(summary) ? validation.validateEmptyAndRequired(summary) + "summary" : null
            ].filter(Boolean);

            // Check if the book already exists
            const existingBook = await Book.findOne({ name });
            if (existingBook) errors.push("Book already exists");

            if (errors.length > 0) {
                return res.status(statusCodes.badRequest).send({
                    message: "Failure",
                    status: statusCodes.badRequest,
                    errors
                });
            }

            const bookDetails = await Book.create({ name, img, summary });

            return res.status(statusCodes.success).send({
                responseJson: {
                    statusCode: statusCodes.success,
                    status: "success",
                    message: "Book created successfully",
                    BookDetails: bookDetails
                }
            });
        } catch (error) {
            const errorResponse = commonFunctions.generateErrorObject(statusCodes.internalServerError, "Internal Server Error");
            return res.status(statusCodes.internalServerError).send(errorResponse);
        }
    });
}

module.exports = createbook;

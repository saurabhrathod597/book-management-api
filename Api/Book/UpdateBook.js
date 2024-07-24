const app = require('../../Utils/ExpressObject');
const { postBase, productName, version } = require('../../Config/Config');
const { moduleName } = require('./BookConfig');
const statusCodes = require('../../Utils/StatusCodes');
const Book = require('../../Schema/Book');
const commonFunctions = require('../../Utils/CommonFunctions');
const validation = require('../../Utils/Validation');
const { default: mongoose } = require('mongoose');
const apiEndpoint = `${postBase}${productName}${version}${moduleName}updatebook`;

function updatebook() {
    app.put(apiEndpoint, async (req, res) => {
        try {
            const { name, img, summary } = req.body.bookDetails;
            const _id = req.query.bookId
           
            // Backend validations for more reliability
            let errors = [
                validation.validateEmptyAndRequired(name) ? validation.validateEmptyAndRequired(name) + "name" : null,
                validation.validateEmptyAndRequired(img) ? validation.validateEmptyAndRequired(img) + "img" : null,
                validation.validateEmptyAndRequired(summary) ? validation.validateEmptyAndRequired(summary) + "summary" : null
            ].filter(Boolean);

                 
           const ifBookIdInvalid = validation.validateBookId(_id)
           if(ifBookIdInvalid) errors.push(ifBookIdInvalid)
            // Check if the book exists
           else if (!await Book.findById(new mongoose.Types.ObjectId(_id))) errors.push("Book not found")
           else{
            // Check if the book already exists
            const existingBook = await Book.findOne({ _id });
            if (!existingBook) errors.push("Book does not exists");
        }

            if (errors.length > 0) {
                return res.status(statusCodes.badRequest).send({
                    message: "Failure",
                    status: statusCodes.badRequest,
                    errors
                });
            }

            let bookData = {
                name:name,
                img:img,
                summary:summary
            }
            const bookDetails = await Book.findByIdAndUpdate(_id, bookData,{new:true});

            return res.status(statusCodes.success).send({
                responseJson: {
                    statusCode: statusCodes.success,
                    status: "success",
                    message: "Book updated successfully",
                    BookDetails: bookDetails
                }
            });
        } catch (error) {
            const errorResponse = commonFunctions.generateErrorObject(statusCodes.internalServerError, "Internal Server Error");
            return res.status(statusCodes.internalServerError).send(errorResponse);
        }
    });
}

module.exports = updatebook;



function validateEmptyAndRequired(input){
   let error
    if(input == undefined) error = "required field:" 
    else if(input.trim()=="") error= "Please enter "
    return error
}

function validateBookId(bookId) {
   let error
   if (bookId === undefined || bookId === null || bookId.trim() === "") {
       error =  "Book ID is required and cannot be null or undefined";
   }
   return error;
}



validation = {
   validateEmptyAndRequired : validateEmptyAndRequired,
   validateBookId : validateBookId
}

module.exports = validation
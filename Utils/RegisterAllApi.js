const createbook = require('../Api/Book/Createbook')
const updatebook = require('../Api/Book/UpdateBook')
const deletebook = require('../Api/Book/DeleteBook')
const getbook = require('../Api/Book/GetBook')
const getallbooks = require('../Api/Book/GetAllBooks')

function registerAllApis(){
  createbook();
  updatebook();
  deletebook();
  getbook();
  getallbooks()

}


module.exports = registerAllApis
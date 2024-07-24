const app = require('../Utils/ExpressObject');
require('dotenv').config();
const port = process.env.PORT || 3002;

function runServer() {
    return new Promise(function (resolve, reject) {
        try {
            app.listen(port, () => {
                resolve(`Listening on port ${port}`);
            });
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = runServer;
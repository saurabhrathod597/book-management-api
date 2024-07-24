const mongoose = require("mongoose");
require('dotenv').config();

function connectToDb() {
    return new Promise(function (resolve, reject) {
        try {
            mongoose.connect(process.env.MONGO_DB_CONNECT_URL)
                .then(() => {
                    resolve("Successfully connected to the database");
                })
                .catch(e => {
                    console.log("Error while connecting to the database: " + e);
                    console.log("Exiting now...");
                    reject(e);
                    process.exit(1);
                });
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = connectToDb;
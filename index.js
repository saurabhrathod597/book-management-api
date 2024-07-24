const connectToDb = require('./DBConnection/DBConnection');
const runServer = require('./Server/StartServer');
const registerAllApis = require('./Utils/RegisterAllApi');



connectToDb().then(function (connectionStatus) {
    console.log(connectionStatus);
    runServer().then(function (message) {
        console.log(message);
        registerAllApis();
    });
}).catch(function (error) {
    console.log("Failed to start server:" + error);
});

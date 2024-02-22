// Importing the Mongoose library, which allows interaction with MongoDB in Node.js
const mongoose = require("mongoose");
// Connecting to the MongoDB database named "socialnetworkDB" running on the local machine
mongoose.connect("mongodb://127.0.0.1:27017/socialnetworkDB");
// Exporting the connection object to be used elsewhere in the application
module.exports = mongoose.connection;

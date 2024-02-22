// Import required modules
const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

// Set the port for the server to listen on
const PORT = 3001;
// Create an Express application instance
const app = express();

// Get the current working directory
const cwd = process.cwd();
// Determine the activity based on the current working directory
const activity = cwd.includes("BC092523-c13")
  ? cwd.split("BC092523-c13")[1]
  : cwd;
// Middleware to parse incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Mount the routes defined in the 'routes' module
app.use(routes);
// Event listener for the database connection 'open' event
db.once("open", () => {
  // Start the Express server and listen on the specified port
  app.listen(PORT, () => {
    // Log a message indicating that the server is running
    console.log(`API server for ${activity} running on port ${PORT}!`);
  });
});

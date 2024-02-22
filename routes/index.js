// Importing necessary module for creating router
const router = require("express").Router();
// Importing API routes from the 'api' module
const apiRoutes = require("./api");
// Mounting the API routes under the '/api' prefix
router.use("/api", apiRoutes);
// Handling requests to incorrect routes with a default response
router.use((req, res) => res.send("Wrong route!"));
// Exporting the router to be used in other parts of the application
module.exports = router;

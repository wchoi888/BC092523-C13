// Importing necessary module for creating router
const router = require("express").Router();
// Importing routes for thoughts and users
const thoughtsRoutes = require("./thoughtsRoutes");
const userRoutes = require("./userRoutes");
// Using routes for thoughts and users with their respective prefixes
router.use("/thoughts", thoughtsRoutes);
router.use("/users", userRoutes);
// Exporting the router to be used in other parts of the application
module.exports = router;

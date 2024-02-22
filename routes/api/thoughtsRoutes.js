// Importing necessary module for creating router
const router = require("express").Router();
// Importing controller methods for handling thoughts-related operations
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thoughtsController.js");
// Defining routes for different HTTP methods and endpoints
router.route("/").get(getThoughts).post(createThought);

router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

router.route("/:thoughtId/reactions").post(addReaction);

router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);
// Exporting the router to be used in other parts of the application
module.exports = router;

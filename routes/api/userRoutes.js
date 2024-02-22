// Importing necessary module for creating router
const router = require("express").Router();
// Importing controller methods for handling users-related operations
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  addFriend,
  removeFriend,
} = require("../../controllers/usersController");
// Defining routes for different HTTP methods and endpoints
router.route("/").get(getUsers).post(createUser);

router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

router.route("/:userId/friends").post(addFriend);

router.route("/:userId/friends/:friendId").delete(removeFriend);
// Exporting the router to be used in other parts of the application
module.exports = router;

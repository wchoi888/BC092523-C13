const connection = require("../config/connection");
const { Thoughts, Users } = require("../models");
const {
  getRandomName,
  getRandomThoughts,
  getRandomEmail,
  usernames,
} = require("./data");
//const { getRandomName, getRandomAssignments } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  // Delete the collections if they exist
  let thoughtsCheck = await connection.db
    .listCollections({ name: "thoughts" })
    .toArray();
  if (thoughtsCheck.length) {
    await connection.dropCollection("thoughts");
  }

  let usersCheck = await connection.db
    .listCollections({ name: "users" })
    .toArray();
  if (usersCheck.length) {
    await connection.dropCollection("users");
  }

  const thoughts = getRandomThoughts(15);

  const thoughtsData = await Thoughts.insertMany(thoughts);
  const users = usernames.map((username) => ({
    username,
    email: getRandomEmail(username),
    userThoughts: thoughtsData.map((thought) => thought._id),
  }));

  await Users.insertMany(users);

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.table(thoughts);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});

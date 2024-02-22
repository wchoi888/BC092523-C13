// Import required modules
const connection = require("../config/connection");
const { Thoughts, Users } = require("../models");
const {
  getRandomName,
  getRandomThoughts,
  getRandomEmail,
  usernames,
} = require("./data");

// Event handler for connection errors

connection.on("error", (err) => err);
// Event handler for connection open
connection.once("open", async () => {
  console.log("connected");
  // Check if collections exist and delete them if they do
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
  // Generate random thoughts data
  const thoughts = getRandomThoughts(15);
  // Insert generated thoughts data into the database
  const thoughtsData = await Thoughts.insertMany(thoughts);
  // Generate users data based on generated thoughts
  const users = [];
  usernames.forEach((username) => {
    const email = getRandomEmail(username);
    const userThoughts = thoughtsData
      .filter((thought) => thought.username === username)
      .map((thought) => thought._id);
    users.push({ username, email, thoughts: userThoughts });
  });
  // Insert generated users data into the database
  await Users.insertMany(users);

  // Insert generated users data into the database
  console.table(users);
  console.table(thoughts);
  console.info("Seeding complete! 🌱");
  // Exit the process after seeding is complete
  process.exit(0);
});

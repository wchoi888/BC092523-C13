const usernames = [
  "Aaran",
  "Aaren",
  "Aarez",
  "Aarman",
  "Aaron",
  "Zechariah",
  "Zeek",
  "Zeeshan",
  "Zeid",
  "Zein",
  "Zen",
  "Zendel",
  "Zenith",
  "Zennon",
];

const emailExt = ["@gmail.com", "@live.com", "@yahoo.com"];

const thoughts = [
  "How to disagree with someone",
  "iPhone review",
  "how-to video",
  "video essay on the history of video games",
  "How to make money on the App Store",
  "Learn NextJS in five minutes (Not clickbate)",
  "Movie trailer",
  "Hello world",
  "Another possible solution to the algorithm",
  "Apology video",
  "Submission for startup pitch",
];

const reactions = [
  "love",
  "grinning",
  "smiling",
  "star-struck",
  "thinking",
  "smirking",
  "grimacing",
  "worried",
  "frowning",
  "anxious ",
  "fearful",
  "anguish",
  "tired",
  "weary",
  "angry",
  "furious",
  "indifferent",
];

const usersData = [];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random username
const getRandomName = () => `${getRandomArrItem(usernames)}`;
// Gets a random thoughts
`${getRandomArrItem(thoughts)}`;
// Gets a random thoughts
const getRandomEmail = (username) => `${username}${getRandomArrItem(emailExt)}`;
// Gets a random reactions

// Function to generate random videos that we can add to the database. Includes video responses.
const getRandomThoughts = (int) => {
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      thoughtsText: getRandomArrItem(thoughts),
      username: getRandomName(),
      reactions: [...getRandomReactions(3)],
    });
  }
  return results;
};

const getRandomReactions = (int) => {
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      reactionBody: getRandomArrItem(reactions),
      username: getRandomName(),
    });
    return results;
  }
};

// Export the functions for use in seed.js
module.exports = {
  getRandomName,
  getRandomThoughts,
  getRandomEmail,
  usernames,
};

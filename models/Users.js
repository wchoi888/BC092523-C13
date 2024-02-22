// Importing necessary modules from mongoose
const { Schema, model } = require("mongoose");
// Defining a schema for users
const userSchema = new Schema(
  {
    // Defining properties for the user schema
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [
        /^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,})$/,
        "please enter your valid email",
      ],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thoughts",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    ],
  },
  {
    // Additional configuration options for the schema
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
// Defining a virtual property for friend count
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});
// Creating a Mongoose model named "Users" based on the user schema
const Users = model("users", userSchema);
// Exporting the Users model for use in other parts of the application
module.exports = Users;

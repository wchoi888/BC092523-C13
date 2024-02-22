// Importing necessary modules from mongoose and date-fns
const { Schema, model } = require("mongoose");
const { format, formatDate } = require("date-fns");
// Importing the reactions schema
const reactions = require("./Reactions");
// Defining a schema for thoughts
const thoughtsSchema = new Schema(
  {
    // Defining properties for the thoughts schema
    thoughtsText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactions],
  },
  // Additional configuration options for the schema
  { toJSON: { virtuals: true }, id: false }
);
// Defining a virtual property for reaction count
thoughtsSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});
// Defining a virtual property for formatted date
thoughtsSchema.virtual("formattedDate").get(function () {
  return format(this.createdAt, "yyyy-MM-dd HH:mm:ss");
});
// Creating a Mongoose model named "Thoughts" based on the thoughts schema
const Thoughts = model("thoughts", thoughtsSchema);
// Exporting the Thoughts model for use in other parts of the application
module.exports = Thoughts;

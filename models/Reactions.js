// Importing necessary modules from mongoose and date-fns
const { Schema, Types } = require("mongoose");
const { format, formatDate } = require("date-fns");
// Defining a schema for reactions
const reactionSchema = new Schema(
  {
    // Defining properties for the reaction schema
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
// Additional configuration options for the schema
reactionSchema.virtual("formattedDate").get(function () {
  return format(this.createdAt, "yyyy-MM-dd HH:mm:ss");
});
// Exporting the reaction schema
module.exports = reactionSchema;

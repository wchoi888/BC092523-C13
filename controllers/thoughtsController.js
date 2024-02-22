// Importing necessary models from "../models" directory
const { Thoughts, Users, Reactions } = require("../models");
// Exporting an object containing various asynchronous functions to handle different API endpoints related to thoughts
module.exports = {
  // Function to retrieve all thoughts from the database and populate their reactions
  async getThoughts(req, res) {
    try {
      const thoughts = await Thoughts.find().populate("reactions");
      res.json(thoughts);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Function to retrieve a single thought by its ID and populate its reactions
  async getSingleThought(req, res) {
    try {
      const thought = await Thoughts.findOne({
        _id: req.params.thoughtId,
      }).populate("reactions");

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Function to create a new thought
  async createThought(req, res) {
    try {
      const thought = await Thoughts.create(req.body);
      const user = await Users.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: "Thought created, but found no user with that ID",
        });
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Function to delete a thought by its ID
  async deleteThought(req, res) {
    try {
      const thought = await Thoughts.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        res.status(404).json({ message: "No thought with that ID" });
      }
      const user = await Users.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({
          message: "Thoughts deleted, but no users found",
        });
      }

      res.json({ message: "Thought deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Function to update a thought by its ID
  async updateThought(req, res) {
    try {
      const thought = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: "No thought with this id!" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Function to add a reaction to a thought by its ID
  async addReaction(req, res) {
    try {
      const thought = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought with this id!" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Function to remove a reaction from a thought by its ID and the reaction's ID
  async removeReaction(req, res) {
    try {
      const thought = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No reaction found with that ID :(" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

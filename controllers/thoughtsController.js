const { Thoughts, Users, Reactions } = require("../models");

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thoughts.find().populate("reactions");
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const thought = await Thoughts.findOne({
        _id: req.params.thoughtsId,
      }).populate("reactions");

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createThought(req, res) {
    try {
      const thought = await Thoughts.create(req.body);
      const user = await Users.findOneAndUpdate(
        { _id: req.body.usersId },
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

  async deleteThought(req, res) {
    try {
      const thought = await Thoughts.findOneAndDelete({
        _id: req.params.thoughtsId,
      });

      if (!thought) {
        res.status(404).json({ message: "No thought with that ID" });
      }
      const user = await Users.findOneAndUpdate(
        { thoughts: req.params.thoughtsId },
        { $pull: { thoughts: req.params.thoughtsId } },
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

  async updateThought(req, res) {
    try {
      const thought = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtsId },
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
  async addThoughtReactions(req, res) {
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
};
const reactionCount = async () => {
  const numberOfReactions = await Thoughts.aggregate().count("reactionCount");
  return numberOfReactions;
};

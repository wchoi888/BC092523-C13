// Importing necessary modules and models
const { ObjectId } = require("mongoose").Types;
const { Users, Thoughts } = require("../models");
// Exporting an object containing various asynchronous functions to handle different API endpoints related to users
module.exports = {
  // Function to retrieve all users from the database and populate their associated thoughts
  async getUsers(req, res) {
    try {
      const users = await Users.find().populate("thoughts");

      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Function to retrieve a single user by their ID and populate their associated thoughts
  async getSingleUser(req, res) {
    try {
      const user = await Users.findOne({
        _id: req.params.userId,
      }).populate("thoughts");

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Function to create a new user
  async createUser(req, res) {
    try {
      const user = await Users.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Function to delete a user by their ID and delete all their associated thoughts
  async deleteUser(req, res) {
    try {
      const user = await Users.findOneAndDelete({
        _id: req.params.userId,
      });

      if (!user) {
        return res.status(404).json({ message: "No such user exists" });
      }
      await Thoughts.deleteMany({ _id: user.thoughts });
      res.json({ message: "User and thoughts successfully deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Function to update a user by their ID
  async updateUser(req, res) {
    try {
      const user = await Users.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: "No user with this id!" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Function to add a friend to a user's friend list
  async addFriend(req, res) {
    console.log("You are adding a friend");
    console.log(req.body);

    try {
      const user = await Users.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.body.friendId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "No user found with that ID :(" });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Function to remove a friend from a user's friend list
  async removeFriend(req, res) {
    console.log("You are removing a friend");
    console.log(req.params.friendId);
    try {
      const user = await Users.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "No user found with that ID :(" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

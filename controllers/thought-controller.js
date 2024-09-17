const { Thoughts, User } = require("../models");

const thoughtController = {
  getAllThoughts(req, res) {
    Thoughts.find()
      .then((thoughts) => {
        console.log(thoughts); // Log the retrieved thoughts
        res.json(thoughts);
      })
      .catch((err) => {
        console.error(err); // Log the error
        res.status(500).json(err);
      });
  },
  createThought(req, res) {
    const { userId, thoughtText, username } = req.body; // Destructure the required fields
  
    // Check if the user exists
    User.findById(userId)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
  
        // Optionally, check if the username matches the user's username
        if (user.username !== username) {
          return res.status(400).json({ message: "Username does not match the user ID" });
        }
  
        // If the user exists and the username is valid, create the thought
        return Thoughts.create({ thoughtText, username, userId });
      })
      .then((dbThoughtData) => {
        // After creating the thought, update the user's thoughts array
        return User.findOneAndUpdate(
          { _id: userId },
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
        );
      })
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },
  updateThought(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) => {
        !thought ? res.status(404).json({ message: 'No thought by ID' }) : res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },
  getThoughtById({ params }, res) {
    Thoughts.findOne({ _id: params.id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought with this ID" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },
  deleteThought(req, res) {
    Thoughts.findOneAndDelete({ _id: req.params.id })
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'No thought with that ID' });
        }
        return User.findOneAndUpdate(
          { _id: thought.userID },
          { $pull: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then(() => res.json({ message: 'Thought deleted successfully!' }))
      .catch((err) => res.status(500).json(err));
  },
  addReaction(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought found with that ID :(' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  deleteReaction(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought found with that ID :(' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  }
};

module.exports = thoughtController;
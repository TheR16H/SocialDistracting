const { Thoughts, User } = require("../models");

const thoughtController = {
  getAllThoughts(req, res) {
    Thoughts.find()
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  createThought(req, res) {
    Thoughts.create(req.body)
      .then((dbThoughtData) => {
        return User.findOneAndUpdate(
          { _id: req.body.userID },
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
        );
      })
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },
  updateThought(req, res) {
    Thoughts.findOneAndUpdate( // Use Thoughts here
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
    Thoughts.findOne({ _id: params.id }) // Use Thoughts here
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
    Thoughts.findOneAndDelete({ _id: req.params.id }) // Use Thoughts here
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: 'No thought with that ID' });
        }
        return User.findOneAndUpdate(
          { _id: req.body.userID },
          { $pull: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then(() => res.json({ message: 'User and associated thoughts deleted!' })) // Corrected message
      .catch((err) => res.status(500).json(err));
  },
  addReaction(req, res) {
    Thoughts.findOneAndUpdate( // Use Thoughts here
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
    Thoughts.findOneAndUpdate( // Use Thoughts here
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
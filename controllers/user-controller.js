const { Thought, User } = require("../models");
// bug on line 33?
const userController = { 
    getAllUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    createUser(req, res){
        User.create(req.body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res){
        User.findOneAndUpdate(
            {_id:req.params.id},
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((user) => {
            !user ? res.status(404).json({ message: 'No user' }) : res.json(user);
        })
        .catch((err) => res.status(500).json(err));
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.id })
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: 'No user with that ID' });
                }
                return Thought.deleteMany({ _id: { $in: user.thoughts } });
            })
            .then(() => res.json({ message: 'User and associated thoughts deleted!' }))
            .catch((err) => res.status(500).json(err));
    },
    getUserById(req, res){
        User.findOne({_id: req.params})
        .then((user) => !user ? res.status(404).json({ message: 'No user with that ID' }) : res.json(user))
        .catch((err) => res.status(500).json(err));
},
addFriend(req, res){
    User.findOneAndUpdate(
        {_id: ewq.params.id},
        {$addToSet: { friends: req.params.friendsid } },
        {runValidators: true, new: true}
    )
    .then((user) => !user ? res.status(404).json({ message: 'No friend found with that ID :(' }) : res.json(user))
    .catch((err) => res.status(500).json(err));
},
removeFriend(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { friends: req.params.friendsId } },
        { runValidators: true, new: true }
    )
    .then((user) => !user ? res.status(404).json({ message: 'No friend found with that ID :(' }) : res.json(user))
    .catch((err) => res.status(500).json(err));
}
};

module.exports = userController;
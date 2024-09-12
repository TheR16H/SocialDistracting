const {Thoughts, User} = require("../models")

const userController = {
    getAllUsers(req, res){
        Users.find()
        .then((users) => res.json(users))
    }
}
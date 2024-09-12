//**`/api/users`**




// **BONUS**: Remove a user's associated thoughts when deleted.

// ---



const router = require("express").Router();
// * `GET` all users
// * `GET` a single user by its `_id` and populated thought and friend data
// * `POST` a new user:
// * `PUT` to update a user by its `_id`
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/user-controller");
// * `POST` to add a new friend to a user's friend list

router.route("/").get(getAllUsers).post(createUser);
// * `DELETE` to remove a friend from a user's friend list

router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);
// * `DELETE` to remove user by its `_id`

router.route("/:id/friends/:friendsId").post(addFriend).delete(removeFriend);
// **`/api/users/:userId/friends/:friendId`**

module.exports = router;

// ```json
// // example data
// {
//   "username": "lernantino",
//   "email": "lernantino@gmail.com"
// } use this for testing
// ```
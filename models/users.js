const {Schema, model} = require("mongoose");

const userSchema = new Schema({ 
 username: {
    type: String,
    unique: true,
    required: true,
    trim: true
},
email: {
    type: String,
    unique: true,
    required: true,
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,  "Your email was wrong, please enter a valid email address"]
},
// * `thoughts`
//   * Array of `_id` values referencing the `Thought` model

// * `friends`
//   * Array of `_id` values referencing the `User` model (self-reference)
// **Schema Settings**:

// Create a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query.
})
const {Schema, model, Types} = require("mongoose");
const dateFormat = require("../Date/dateformat");

// **Thought**:
const reactions = new Schema(
    {
    thoughtText: {
    type: String,
    required: true,
    maxlength:275    
},
createdAt: {    
    type: Date,
    default: Date.now, 
    get: (createdAtVal) => dateFormat(createdAtVal),
},
username: {
//   * String
//   * Required

// * `reactions` (These are like replies)
//   * Array of nested documents created with the `reactionSchema`
// **Schema Settings**:

// Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.

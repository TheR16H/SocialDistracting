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
    type: String,
    required: true,
},
reactions: [reactionSchema], 
    },
    {
        toJSON: {
          virtuals: true,
          getters: true,
        },
        id: false,
      }
    );

// Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.
thoughtSchema.virtual("reactionCount").get(function () { 
    return this.reactions.length;
});

const Thoughts = model("Thoughts", thoughtSchema);

module.exports = Thoughts;
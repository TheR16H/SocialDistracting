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
thoughts: [
    {
       type: Schema.Types.ObjectId, 
       ref: "Thought"
    },
],
friends:[
    {
        type: Schema.Types.ObjectId,
            ref: "User"
        },
    ]
}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});
userSchema.virtual("friendCount").get(function () { 
    return this.friends.length;
});

const User = model("User", userSchema);
module.exports = User;
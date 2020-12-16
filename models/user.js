const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const selfevalSchema = new Schema(
  {
    whatelementareyou: {type: String, enum: ['Fire', 'Earth', 'Metal', 'Water', 'Wood']},
    jitsuelement: {type: String, enum: ['Fire', 'Earth', 'Metal', 'Water', 'Wood']},
    kyoelement: {type: String, enum: ['Fire', 'Earth', 'Metal', 'Water', 'Wood']},

  },{
    timestamps: true
  }
);



const userSchema = new Schema(
  {
    name: String,
    alias: String,
    email: String,
    avatar: String,
    googleId: String,
    bio: String,
    friends: [{type: Schema.Types.ObjectId, ref: "User"}],
    selfeval: [selfevalSchema],
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);

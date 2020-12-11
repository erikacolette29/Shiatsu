const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const selfevalSchema = new Schema(
  {
    whatelementareyou: String,
    jitsuelement: String,
    kyoelement: String

  },{
    timestamps: true
  }
);



const userSchema = new Schema(
  {
    name: String,
    email: String,
    avatar: String,
    googleId: String,
    friends: [{type: Schema.Types.ObjectId, ref: "User"}],
    selfeval: [selfevalSchema],
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);

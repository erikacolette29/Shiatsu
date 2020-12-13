const User = require("../models/user")
const Message = require("../models/message")

module.exports = {
   index,
}

function index(req,res) {
User.find({})
.then((users)=> {
res.render("users/index", {title: "User Index", users, user: req.user})
    })
}


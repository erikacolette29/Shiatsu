const User = require("../models/user")
const Message = require("../models/message")

module.exports = {
   index,
   update,
   showtreatment,
   showSelfEval,
 createEval,
 showTheory,
 
}

function index(req,res) {
User.find({})
.then((users)=> {
res.render("users/index", {title: "User Index", users, user: req.user})
    })
}

function update(req,res){
    User.findByIdAndUpdate(req.params.id, req.body, {new:true})
    .then(() =>{
        res.redirect("/users")
    })
}


function showtreatment(req, res) {
    User.find({}).then((users) => {
      res.render("users/treatment", { title: "User Treatment", user: req.user, users });
    });
  }



function showSelfEval(req,res){
User.find({}).then((users) =>{
    res.render("users/selfeval", {title: "Self Eval", user: req.user, users})
})
}

function createEval(req,res){
User.findById(req.params.id, function(err, user){
    user.selfevals.push(req.body)
    user.save(function(err){
        res.redirect("/users")
    })
})
}

function showTheory(req,res){
    User.find({}).then((users)=> {
        res.render("users/theory", {title: "Theory", user: req.user, users})
    })
}
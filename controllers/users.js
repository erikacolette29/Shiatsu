const User = require("../models/user");
const Message = require("../models/message");

module.exports = {
  index,
  update,
  showtreatment,
  showSelfEval,
  createEval,
  showTheory,
  userList,
  showUdetails,
  addFriend,
  unFriend,
  deleteEval,
};

function index(req, res) {
  User.findById(req.user._id)
    .populate("friends")
    .then((user) => {
      res.render("users/index", { title: "User Index", user });
    });
}

function update(req, res) {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(() => {
    res.redirect("/users");
  });
}

function showtreatment(req, res) {
  User.find({}).then((users) => {
    res.render("users/treatment", {
      title: "User Treatment",
      user: req.user,
      users,
    });
  });
}

function showSelfEval(req, res) {
  User.find({}).then((users) => {
    res.render("users/selfeval", { title: "Self Eval", user: req.user, users });
  });
}

function createEval(req, res) {
  User.findById(req.params.id, function (err, user) {
    user.selfevals.push(req.body);
    user.save(function (err) {
      res.redirect("/users");
    });
  });
}

function deleteEval(req, res) {
  console.log(req.user);
  User.findById(req.user._id).then((user) => {
    let idx = user.selfevals.findIndex(
      (selfeval) => selfeval._id == req.params.selfevalId
    );
    user.selfevals.splice(idx, 1);
    console.log(user);
    user.save().then(() => {
      res.redirect("/users");
    });
  });
}

function showTheory(req, res) {
  User.find({}).then((users) => {
    res.render("users/theory", { title: "Theory", user: req.user, users });
  });
}

// user list

function userList(req, res) {
  User.find({}).then((users) => {
    res.render("users/userlist", { title: "User list", user: req.user, users });
  });
}

function showUdetails(req, res) {
  User.findById(req.params.id).then((userInfo) => {
    res.render("users/usershow", {
      title: "User Details",
      user: userInfo,
      loggedInuser: req.user,
    });
  });
}

//friend and unfriend

function addFriend(req, res) {
  req.user.friends.push(req.params.id);
  req.user.save().then(() => {
    res.redirect(`/users/${req.params.id}`);
  });
}

function unFriend(req, res) {
  let idx = req.user.friends.indexOf(req.params.id);
  req.user.friends.splice(idx, 1);
  req.user.save().then(() => {
    res.redirect(`/users/${req.params.id}`);
  });
}

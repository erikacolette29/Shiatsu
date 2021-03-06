const router = require('express').Router()
const messCtrl = require("../controllers/messages")

// message index page
router.get("/", isLoggedIn, messCtrl.index)
router.post("/", isLoggedIn, messCtrl.create)

//message show page by individual id
router.get("/:id", isLoggedIn, messCtrl.show)
router.post("/:id", isLoggedIn, messCtrl.reply)

//delete message
router.delete("/:id", isLoggedIn, messCtrl.deleteMessage)
//delete reply
router.delete("/:messageId/:replyId", isLoggedIn, messCtrl.deleteReply)




function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
  }


module.exports = router;
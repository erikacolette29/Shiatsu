const router = require('express').Router()
const userCtrl = require('../controllers/users')



router.get("/", isLoggedIn, userCtrl.index)
router.put("/:id", isLoggedIn, userCtrl.update)
router.get("/treatment", isLoggedIn, userCtrl.showtreatment)

router.get("/selfeval", isLoggedIn, userCtrl.showSelfEval)
router.put("/:id/neweval", isLoggedIn, userCtrl.createEval)

router.delete("/:selfevalId", isLoggedIn, userCtrl.deleteEval)

router.get("/theory", isLoggedIn, userCtrl.showTheory)


//userlist
router.get("/userlist", isLoggedIn, userCtrl.userList);
router.get("/:id", isLoggedIn, userCtrl.showUdetails)

router.get("/:id/friend", isLoggedIn, userCtrl.addFriend)
router.get("/:id/unfriend", isLoggedIn, userCtrl.unFriend)





function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
  }



module.exports = router;
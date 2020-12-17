const router = require('express').Router()
const userCtrl = require('../controllers/users')



router.get("/", isLoggedIn, userCtrl.index)
router.put("/:id", isLoggedIn, userCtrl.update)
router.get("/treatment", isLoggedIn, userCtrl.showtreatment)

router.get("/selfeval", isLoggedIn, userCtrl.showSelfEval)
router.put("/:id/neweval", isLoggedIn, userCtrl.createEval)


router.get("/theory", isLoggedIn, userCtrl.showTheory)

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
  }



module.exports = router;
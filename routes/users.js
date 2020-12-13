const router = require('express').Router()
const userCtrl = require('../controllers/users')



router.get("/", isLoggedIn, userCtrl.index)
router.get("/treatment", isLoggedIn, userCtrl.showtreatment)







function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
  }



module.exports = router;
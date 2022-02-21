const express = require('express')
const router = express.Router()
const misc = require('../controllers/misc.controller')
const passport = require('passport')


const authController = require('../controllers/auth.controller')
const userController = require('../controllers/user.controller')


/* Misc routes */
router.get('/', misc.home)

/* Auth routes */

router.get('/register', authController.register)
router.post('/register', authController.doRegister)
router.get('/login', authController.login)
router.post('/login', authController.doLogin)
router.get('/activate/:token', authController.activate)
router.get('/logout', authController.logout)



/* User routes */

router.get('/profile', userController.profile)


module.exports = router
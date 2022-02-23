const express = require('express')
const router = express.Router()
const misc = require('../controllers/misc.controller')
const passport = require('passport')
const authMiddleware = require('../middlewares/auth.middleware')


const authController = require('../controllers/auth.controller')
const userController = require('../controllers/user.controller')
const gymController = require('../controllers/gym.controller')

const SCOPES = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email"
]

/* Misc routes */
router.get('/', misc.home)

/* Auth routes */

router.get('/register', authController.register)
router.post('/register', authController.doRegister)
router.get('/login', authController.login)
router.post('/login', authController.doLogin)
router.get('/activate/:token', authController.activate)
router.get('/login/google', passport.authenticate('google-auth', { scope: SCOPES }))
router.get('/auth/google/callback', authController.doLoginGoogle)
router.get('/logout', authController.logout)

/* Gym routes */

router.get('/gyms', gymController.list)
router.get('/gyms/new', authMiddleware.isAuthenticated, gymController.create)
router.post('/gyms', authMiddleware.isAuthenticated, gymController.doCreate)

/* User routes */

router.get('/profile', authMiddleware.isAuthenticated, userController.profile)


module.exports = router
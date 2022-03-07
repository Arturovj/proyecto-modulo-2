const express = require('express')
const router = express.Router()
const misc = require('../controllers/misc.controller')
const passport = require('passport')
const authMiddleware = require('../middlewares/auth.middleware')

const upload = require('../config/storage.config')
console.log(upload)

const authController = require('../controllers/auth.controller')
const userController = require('../controllers/user.controller')
const gymController = require('../controllers/gym.controller')
const trainerController = require('../controllers/trainer.controller')

const SCOPES = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email"
]

/* Misc routes */
router.get('/', misc.home)

router.get('/about', misc.about)
router.get('/services', misc.services)
router.get('/faq', misc.faq)



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
router.post('/gyms', upload.single('image'), authMiddleware.isAuthenticated, gymController.doCreate)
router.get('/gyms/:id',gymController.detail)
router.post('/gyms/:id', authMiddleware.isAuthenticated, gymController.doComment)
router.get('/gyms/:id/edit', authMiddleware.isAuthenticated, gymController.editGym);
router.post('/gyms/:id/edit', authMiddleware.isAuthenticated, gymController.doEditGym);
router.post('/gyms/:id/delete', authMiddleware.isAuthenticated,gymController.delete);


/* User routes */

router.get('/profile', authMiddleware.isAuthenticated, userController.profile)
router.get('/users/:id/edit', authMiddleware.isAuthenticated, userController.editUser);
router.post('/users/:id/edit', authMiddleware.isAuthenticated, upload.single('image'), userController.doEditUser);

/* Footer routes */



/* Social routes */


/* Trainer routes */

router.get('/trainers', trainerController.trainersList)
router.get('/trainers/newTrainer',authMiddleware.isAuthenticated, trainerController.createTrainer)
// router.post('/trainers', upload.single('image'), authMiddleware.isAuthenticated, gymController.doCreateTrainer )

module.exports = router
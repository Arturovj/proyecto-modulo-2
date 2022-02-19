const express = require('express')
const router = express.Router()
const misc = require('../controllers/misc.controller')

const authController = require('../controllers/auth.controller')


/* Misc routes */
router.get('/', misc.home)

/* Auth routes */

router.get('/register', authController.register)
router.post('/register', authController.doRegister)
router.get('/login', authController.login)
/* router.post('/login', authController.doLogin)
 */

module.exports = router
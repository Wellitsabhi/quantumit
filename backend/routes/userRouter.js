const express = require('express')
const router = express.Router()
const {login, register, dashboard} = require('../controllers/userController.js')
const {authCheck} = require('../middlewares/authCheck')

router.post('/login', login)


router.post('/register', register)

router.get('/dashboard', authCheck, dashboard)


module.exports = router;
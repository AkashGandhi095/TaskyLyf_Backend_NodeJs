const express = require('express')
const userController = require('./../controller/UserController')
const router = express.Router()

// check this and understand this middleware
router
.route('/')
.post( userController.checkUserReqBody, userController.registerUser)

module.exports = router




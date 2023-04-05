
const express = require('express');
const userController = require('../controllers/userController')

const router = express.Router();


router.get('/', userController.showUserData)
router.post('/login', userController.loginUser)
router.post('/register', userController.register)

module.exports = { router };
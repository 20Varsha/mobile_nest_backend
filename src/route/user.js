const express = require('express');
const router = express.Router();
const userController=require("../controller/user")
const {auth}=require("../middleware/authorization")

//User authentication
router.post('/register', userController.create);
router.post('/login', userController.login);

//User profile
router.get('/profile',auth, userController.profile);
router.patch('/profile/edit',auth, userController.edit);

//Reset password
router.post('/reset-password',auth, userController.resetPassword);

// Forgot Password
router.post('/forgot-password', userController.forgotPassword);

// Update Password - Updates password if the token is valid
router.post('/change-password', userController.changePassword);

module.exports = router

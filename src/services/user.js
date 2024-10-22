const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const userRepository = require("../repository/user");
require("dotenv").config();
const { sendMail } = require('./emailService');
const crypto = require('crypto');
const { EMAIL_USER, EMAIL_PASS, RESET_TOKEN_EXPIRY } = require('../../config');

const create = async (data) => {
    const { email, password, confirm_password, name } = data;
    const user = await userRepository.getUser({ email });
    if (user && user.length >= 1) {
        return { errorCode: 1001 };
    } else if (password !== confirm_password) {
        return { errorCode: 1002 };
    } else {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const token = jwt.sign({ email }, process.env.JWT_SECRET);
        const signup = await userRepository.createUser({
            name,
            email,
            password: hashedPassword,
            signupToken: token,
        });
        return signup;
    }
};

const login = async (data) => {
    const { email, password } = data;
    const user = await userRepository.getUser({ email });
    if (!user || user.length < 1) {
        return { errorCode: 1003 };
    }
    const match = await bcrypt.compare(password, user[0].password);
    if (!match) {
        return { errorCode: 1004 };
    }
    const token = jwt.sign({ email: user[0].email, name: user[0].name, userId: user[0]._id }, process.env.JWT_SECRET);
    return { token };
};

const profile = async (userId) => {
    const user = await userRepository.getUserById(userId);
    if (!user) {
        return { errorCode: 1001 };
    }
    return user;
};

const edit = async (userId, updateData) => {
    const user = await userRepository.update({ _id: userId }, updateData);
    if (!user) {
        return { errorCode: 1001 }
    }
    return user;
};

const resetPassword = async (userId, newPassword) => {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const result = await userRepository.update({ _id: userId }, { password: hashedPassword });
    if (result) {
        return result;
    } else {
        return { errorCode: 1001 };
    }
};

// Send reset mail
const forgotPassword = async (email) => {
    const user = await userRepository.findUserByEmail(email);
    if (!user) {
        return { errorCode: 1000 };
    }
    // Generate reset token and expiration
    const resetTokenExpiration = Date.now() + parseInt(process.env.TOKEN_TIMEOUT);
    const resetToken = jwt.sign(
        { userId: user.id, exp: Math.floor(resetTokenExpiration / 1000) },
        process.env.JWT_SECRET
    );
    const resetLink = `${process.env.FRONTEND_URL}/${resetToken}`;
    // Store token expiration in the database
    user.resetTokenExpiration = resetTokenExpiration;
    await userRepository.updateUser(user);
    const context = {
        name: user.name,
        resetLink,
    };
    await sendMail(email, 'Password Reset', 'resetPassword', context);
    return { errorCode: 0 };
};

// Change password
const changePassword = async (userId, newPassword, confirmPassword) => {
    if (newPassword !== confirmPassword) {
        return { errorCode: 1001 };
    }
    const user = await userRepository.getUserById(userId);
    if (!user) {
        return { errorCode: 1002 };
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await userRepository.updateUserPassword(userId, hashedPassword);
    return { errorCode: 0 };
};

module.exports = { create, login, profile, edit, resetPassword, forgotPassword, changePassword };
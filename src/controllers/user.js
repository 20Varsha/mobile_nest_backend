const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SUCCESS_MESSAGES, ERROR_MESSAGES,constants } = require('../utils/constants');

exports.register = async (req, res) => {
    const { name, email, password, role } = req.body; 
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, role });
        res.status(201).json({ message: SUCCESS_MESSAGES.USER_REGISTERED, user });
    } catch (error) {
        res.status(500).json({ message:constants.ERROR, error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: ERROR_MESSAGES.INVALID_CREDENTIALS });
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.status(200).json({ token, role: user.role, message: SUCCESS_MESSAGES.LOGIN_SUCCESS });
};
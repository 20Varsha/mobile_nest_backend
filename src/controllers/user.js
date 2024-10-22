const constant = require("../utils/constants");
const userService = require("../service/user");

const create = async (req, res) => {
    try {
        const result = await userService.create(req.body);
        if (result.errorCode === 1001) {
            return res.status(409).send({ message: constant.USER_EXIST });
        } else if (result.errorCode === 1002) {
            return res.status(409).send({ message: constant.PASSWORD_MISS_MATCH });
        }
        res.status(200).json({ status: "success", message: constant.USER_CREATED, result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const login = async (req, res) => {
    try {
        const result = await userService.login(req.body);
        if (result.errorCode === 1003) {
            return res.status(200).json({ status: "error", message: constant.NOT_FOUND });
        } else if (result.errorCode === 1004) {
            return res.status(200).json({ status: "error", message: constant.PASSWORD_MISS_MATCH });
        }
        res.status(200).json({ status: "success", message: constant.AUTHENTICATION_SUCCESSFUL, result });
    } catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
};

const profile = async (req, res) => {
    try {
        const userId = req.user._id;
        const userData = await userService.profile(userId);
        if (userData.errorCode === 1001) {
            return res.status(404).json({ status: 'error', message: constant.NOT_FOUND });
        }
        res.status(200).json({ status: 'success', data: userData });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

const edit = async (req, res) => {
    try {
        const userId = req.user._id;
        const { name, profileImage, mobile } = req.body;
        const updateData = {};
        if (name) updateData.name = name;
        if (profileImage) updateData.profileImage = profileImage;
        if (mobile) updateData.mobile = mobile;
        const result = await userService.edit(userId, updateData);
        if (result.errorCode === 1001) {
            return res.status(404).json({ status: 'error', message: result.message });
        }
        res.status(200).json({ status: 'success', message: constant.UPDATE_USER });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

const resetPassword = async (req, res) => {
    try {
        const userId = req.user._id;
        const { newPassword, confirmPassword } = req.body;
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: constant.PASSWORDS_DO_NOT_MATCH });
        }
        const result = await userService.resetPassword(userId, newPassword);
        if (result) {
            return res.status(200).json({ message: constant.PASSWORD_RESET });
        } else if (result.errorCode === 1001) {
            return res.status(400).json({ message: constant.PASSWORD_RESET_ERROR });
        } else {
            return res.status(500).json({ message: constant.INTERNAL_SERVER_ERROR });
        }
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const result = await userService.forgotPassword(email);
        switch (result.errorCode) {
            case 1000:
                return res.status(404).json({ message: constant.NOT_FOUND });
            case 0:
                return res.status(200).json({ message: constant.SEND_MAIL });
            default:
                return res.status(500).json({ message: constant.ERROR });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const changePassword = async (req, res) => {
    const { userId, newPassword, confirmPassword } = req.body;
    try {
      const result = await userService.changePassword(userId, newPassword, confirmPassword);
      switch (result.errorCode) {
        case 1001:
          return res.status(400).json({ errorCode: 1001, message: constant.PASSWORD_MISS_MATCH });
        case 1002:
          return res.status(404).json({ errorCode: 1002, message: constant.NOT_FOUND });
        case 0:
          return res.status(200).json({ errorCode: 0, message: constant.PASSWORD_RESET });
        default:
          return res.status(500).json({ errorCode: 500, message: constant.ERROR });
      }
    } catch (error) {
      res.status(500).json({ errorCode: 500, message: error.message });
    }
  };
  
module.exports = { create, login, profile, edit, resetPassword, changePassword, forgotPassword };
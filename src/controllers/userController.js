import userService from '../services/userServices';
import bcrypt from 'bcryptjs';

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({ errCode: 1, message: 'Invalid email or password' });
    }

    let userData = await userService.handleUserLogin(email, password);

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {},
    });
};

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id; //All , Single

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Not Found',
            users: [],
        });
    }

    let users = await userService.getAllUers(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users,
    });
};

let handleCreateUsers = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    return res.status(200).json(message);
};

let handleEditUsers = async (req, res) => {
    let data = req.body;
    let message = await userService.updateUser(data);
    return res.status(200).json(message);
};

let handleDeleteUsers = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Not Found',
        });
    }
    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message);
};

//get API allcodes
let getAllcode = async (req, res) => {
    try {
        let data = await userService.getAllCodeServices(req.query.type);
        return res.status(200).json(data);
    } catch (error) {
        console.log('Get all code error', error);
        return res.status(200).json({
            errorCode: -1,
            errMessage: 'Err From server',
        });
    }
};

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateUsers: handleCreateUsers,
    handleEditUsers: handleEditUsers,
    handleDeleteUsers: handleDeleteUsers,
    getAllcode: getAllcode,
};

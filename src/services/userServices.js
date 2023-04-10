import db from '../models/index';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (error) {
            reject(error);
        }
    });
};

let getAllUers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password'],
                    },
                });
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password'],
                    },
                });
            }
            resolve(users);
        } catch (error) {}
    });
};

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkuserEmail(email);
            if (isExist) {
                //user is already
                let user = await db.User.findOne({
                    attributes: ['email', 'password', 'roleId'],
                    where: { email: email },
                    raw: true,
                });

                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'Done';
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 45;
                        userData.errMessage = 'Fail password check';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = 'Yours Email is not exist, please try again later';
                }
            } else {
                // return error
                userData.errCode = 1;
                userData.errMessage = 'Yours Email is not exist, please try again later';
                resolve(userData);
            }
            resolve(userData);
        } catch (error) {
            reject(error);
        }
    });
};

let checkuserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail },
            });

            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    });
};

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkuserEmail(data.email);
            if (check) {
                resolve({
                    errCode: 1,
                    errMessage: 'Email has exist,try another email',
                });
            } else {
                let hashPasswordFromBcript = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    firstName: data.firstname,
                    lastName: data.lastname,
                    password: hashPasswordFromBcript,
                    address: data.address,
                    gender: data.gender === '1' ? true : false,
                    roleId: data.roleId,
                    phoneNumber: data.phonenumber,
                });

                resolve({
                    errCode: 0,
                    message: 'OK',
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: id },
            });

            if (!user) {
                resolve({
                    errCode: 1,
                    errmessage: 'The user not found',
                });
            }

            await db.User.destroy({
                where: { id: id },
            });
            resolve({
                errCode: 0,
                errmessage: 'delete sucessfully',
            });
        } catch (error) {
            reject(error);
        }
    });
};

let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errmessage: 'User not found',
                });
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false,
            });
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save();
                resolve({
                    errCode: 0,
                    message: 'Update sucessfully',
                });
            } else {
                resolve({
                    errCode: 1,
                    message: 'User not found',
                });
            }
        } catch (error) {
            console.log(error);
        }
    });
};

let getAllCodeServices = (type) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!type) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter',
                });
            } else {
                let res = {};
                let allcodes = await db.Allcode.findAll({
                    where: { type: type },
                });
                res.errCode = 0;
                res.data = allcodes;

                resolve(res);
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    handleUserLogin: handleUserLogin,
    checkuserEmail: checkuserEmail,
    getAllUers: getAllUers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUser: updateUser,
    getAllCodeServices: getAllCodeServices,
};

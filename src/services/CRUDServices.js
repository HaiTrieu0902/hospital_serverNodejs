import bcrypt from 'bcryptjs';
import db from '../models/index';
const salt = bcrypt.genSaltSync(10);
let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcript = await hashUserPassword(data.password);
            await db.User.create({
                firstName: data.firstname,
                lastName: data.lastname,
                email: data.email,
                password: hashPasswordFromBcript,
                address: data.address,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
                phoneNumber: data.phonenumber,
            });

            resolve('create user success');
        } catch (error) {
            reject(error);
        }
    });
};

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

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({ raw: true });
            resolve(users);
        } catch (error) {
            reject(error);
        }
    });
};

let getUSerInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true,
            });

            if (user) {
                resolve(user);
            } else {
                resolve([]);
            }
        } catch (error) {
            reject(error);
        }
    });
};

let updateData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id },
            });
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save();
                resolve();
            } else {
                resolve();
            }
        } catch (error) {
            console.log(error);
        }
    });
};

let deleteUserById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: id },
            });

            if (user) {
                await user.destroy();
            }

            resolve();
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUSerInfoById: getUSerInfoById,
    updateData: updateData,
    deleteUserById: deleteUserById,
};

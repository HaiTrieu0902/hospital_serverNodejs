import db from '../models/index';
import CRUDServices from '../services/CRUDServices';

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();

        return res.render('homePage.ejs', {
            data: JSON.stringify(data),
        });
    } catch (error) {
        console.log(error);
    }
};

let getAboutPage = async (req, res) => {
    return res.send('a lwu wu');
};

let getCRUD = async (req, res) => {
    return res.render('crud.ejs');
};

let postCRUD = async (req, res) => {
    let message = await CRUDServices.createNewUser(req.body);
    console.log(message);
    return res.send('gg');
};

let displayCRUD = async (req, res) => {
    let data = await CRUDServices.getAllUser();
    return res.render('display.ejs', { dataUser: data });
};

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDServices.getUSerInfoById(userId);
        return res.render('editCRUD.ejs', { userData: userData });
    } else {
        return res.send('User not found');
    }
};

let putCRUD = async (req, res) => {
    let data = req.body;
    await CRUDServices.updateData(data);
    return res.send('Update successful');
};

let deleteCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        await CRUDServices.deleteUserById(userId);
        return res.send('Delete successful');
    } else {
        return res.send('Delete Fail');
    }
};

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
};

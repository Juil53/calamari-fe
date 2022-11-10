const { User } = require("../models/index");

//Get All Users
const getUserList = async () => {
    try {
        const users = await User.findAll({
            attributes: ["id", "fullName", "role", "email", "image"],
        });
        if (users) {
            return users;
        }
    } catch (error) {
        return error.message;
    }
};

//Get User by Id
const getUserById = async (id) => {
    const user = await User.findOne({
        where: {
            id,
        },
    });
    if (user) {
        return user;
    } else {
        return false;
    }
};

//Get User by Email
const getUserByEmail = async (email) => {
    const user = await User.findOne({
        where: {
            email,
        },
    });
    if (user) {
        return user;
    } else {
        return false;
    }
};

//Create User
const createUser = async (body, hash) => {
    User.create({
        fullName: body.fullName,
        role: body.role,
        image: body.image,
        email: body.email,
        password: hash,
    });
};

//Check exist
const checkExist = async (body) => {
    const user = await User.findOne({ where: { email: body.email } })
    if (user) {
        return true
    } else {
        return false
    }
}

module.exports = {
    getUserList,
    getUserById,
    getUserByEmail,
    createUser,
    checkExist
};

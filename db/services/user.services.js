const { User } = require("../models/user.model.js");

//Get All Users
const getUserList = async () => {
  try {
    const users = await User.findAll();
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

//Create User
const createUser = async (user) => {
  await User.create({
    firstName: user.body.firstName,
    lastName: user.body.lastName,
  });
};

module.exports = {
  getUserList,
  getUserById,
  createUser,
};

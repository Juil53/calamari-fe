const { User } = require("../models/index");

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
const createUser = async (body) => {
  await User.create({
    firstName: body.firstName,
    lastName: body.lastName,
  });
};

module.exports = {
  getUserList,
  getUserById,
  createUser,
};

import { hash } from "bcrypt";
const { getUserList, createUser } = require("../../../db/services/user.services");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const body = req.body;
    hash(body.password, 10, async function (err, hash) {
      // Create user with hashed password
      await createUser(body,hash);
      // Show all users in DB to check in Postman
      const users = await getUserList();
      res.status(200).json({ data: users });
    });
  } else {
    const users = await getUserList();
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ message: "Not found!" });
    }
  }
}

const { getUserList, createUser } = require("../../../db/services/user.services");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const body = req.body;
    const result = await createUser(body);
    res.status(201).json({ data: result });
  } else {
    const users = await getUserList();
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ message: "Not found!" });
    }
  }
}

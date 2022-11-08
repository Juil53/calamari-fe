const { createEvent } = require("../../../db/services/event.services");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const body = req.body;
    const result = await createEvent(body);
    res.status(201).json({ data: result });
  }
  
  //GET EVENTS
  // else {
  //   const users = await getUserList();
  //   if (users) {
  //     res.status(200).json(users);
  //   } else {
  //     res.status(404).json({ message: "Not found!" });
  //   }
  // }
}

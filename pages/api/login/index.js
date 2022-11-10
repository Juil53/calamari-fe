import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
const { getUserByEmail } = require("../../../db/services/user.services");

export default async function handler(req, res) {
    if (req.method === "POST") {
        const body = req.body;
        const user = await getUserByEmail(body.email);
        compare(body.password, user.password, function (err, result) {
            // result == true
            if (!err && result) {
                const claims = { sub: user.id, myUserEmail: user.email };
                const jwt = sign(claims, "9f0a1a16-60ae-11ed-9b6a-0242ac120002", { expiresIn: "1h" });
                res.json({ authToken: jwt });
            } else {
                res.json({ message: "Ups,something went wrong!" });
            }
        });
    } else {
    }
}

import axios from "axios";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import * as Constant from "../../../constant/constants"

export default async function handler(req, res) {
    if (req.method === "POST") {
        const body = req.body;
        const users = await axios({
            method: "GET",
            url: Constant.usersAPI,
        });

        let checkedUser = await users.data.find(user => user.email === body.email);

        if (checkedUser) {
            compare(body.password, checkedUser.password, function (err, result) {
                console.log(checkedUser.password, body.password);
                if (!err & result) {
                    const claims = { id: checkedUser.id, myUserEmail: checkedUser.email };
                    const jwt = sign(claims, "9f0a1a16-60ae-11ed-9b6a-0242ac120002", { expiresIn: "1h" });
                    res.json({ auth: jwt });
                } else {
                    res.json({ message: "Something wrong!" });
                }
            });
        }
    } else {
        res.status(405).json({ message: 'ONLY POST METHOD ACCEPTED' })
    }
}

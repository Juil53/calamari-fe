import { hash } from "bcrypt";
import { verify } from "jsonwebtoken";
const { getUserList, createUser, checkExist } = require("../../../db/services/user.services");

export const authenticated = (fn) => async (req, res) => {
    // invalid token
    verify(req.cookies.auth, process.env.SECRET_JWT, async function (err, decoded) {
        if (!err && decoded) {
            return await fn(req, res)
        }
        res.status(401).json({ message: 'Not authenticated!' })
    });
};
//Add authen to page
export default authenticated(async function handler(req, res) {
    if (req.method === "POST") {
        const body = req.body;
        hash(body.password, 10, async function (err, hash) {
            //Check Exist User
            const isExist = await checkExist(body)
            if (isExist) {
                res.status(400).json({ message: "Email already exist!" });
            } else {
                // Create user with hashed password
                await createUser(body, hash);
                // Show all users in DB to check in Postman
                const users = await getUserList();
                res.status(200).json({ data: users });
            }
        });
    } else {
        const users = await getUserList();
        if (users) {
            res.status(200).json(users);
        } else {
            res.status(404).json({ message: "Not found!" });
        }
    }
})

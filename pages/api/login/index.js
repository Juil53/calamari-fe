import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import cookie from 'cookie';
const { getUserByEmail } = require("../../../db/services/user.services");

export default async function handler(req, res) {
    if (req.method === "POST") {
        const body = req.body;
        const user = await getUserByEmail(body.email);
        compare(body.password, user.password, function (err, result) {
            if (!err && result) {
                const claims = { sub: user.id, myUserEmail: user.email };
                const jwt = sign(claims, "9f0a1a16-60ae-11ed-9b6a-0242ac120002", { expiresIn: "1h" });

                res.setHeader('Set-Cookie', cookie.serialize('auth', jwt, {
                    httpOnly: true, //Only server can access this cookie, client script cant access
                    // secure: true, // Browser has to use secure/encrypted
                    sameSite: 'strict', // Share cookie with samesite, other site cant get the cookie
                    maxAge: 3600,
                    path: '/'
                }))

                res.json({ auth: jwt });
            } else {
                res.json({ message: "Ups,something went wrong!" });
            }
        });
    } else {
        res.status(405).json({ message: 'ONLY POST METHOD ACCEPTED' })
    }
}

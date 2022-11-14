import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

const options = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "jsmith@gmail.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const user = { name: "John Doe", email: 'johndoe@gmai.com' }
                return user
            }
        }),
    ],
    session: {
        jwt: true
    }
}

export default (req, res) => NextAuth(req, res, options)
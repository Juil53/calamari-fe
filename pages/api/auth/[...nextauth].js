import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { fetchUser } from "../../../utils/utils";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@google.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        try {
          const user = await fetchUser(credentials.email, credentials.password)
          if (user) return user
        } catch (error) {
          throw new Error('Something wrong!')
        }
      }
    })
  ],
  pages: {
    signIn: '/'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user
      }
      return session
    },
  },
  session: {
    strategy: 'jwt'
  },
  theme: {}
})
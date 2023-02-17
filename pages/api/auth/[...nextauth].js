import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { fetchUser } from "../../../utils/utils";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        try {
          const user = await fetchUser(credentials.email, credentials.password)
          if (user) return user
        } catch (error) {
          throw new Error(error)
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/login'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user
        token.role = user.role
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user
        session.role = token.role
      }
      return session
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  theme: {},
})
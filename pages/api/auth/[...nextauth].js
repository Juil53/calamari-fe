import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        if (credentials.email === 'dvhnghia@gmail.com' && credentials.password === '1234') {
          return {
            user: {
              email: 'dvhnghia@gmail.com'
            }
          }
        }
        return null
      }
    })
  ],
  pages:{
    signIn:'/'
  },
  session: {
    strategy: 'jwt'
  }
})
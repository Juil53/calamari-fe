import { withAuth } from "next-auth/middleware"

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      // `/admin` requires Admin role
      if (req.nextUrl.pathname.includes("/admin")) {
        console.log(token)
        return token?.role === "Admin"
      }
      // `other pages` only requires the user to be logged in
      return token
    },    
  },
})

export const config = { matcher: ["/admin", "/admin/:path*"] }
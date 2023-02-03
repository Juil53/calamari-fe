import { withAuth } from "next-auth/middleware"

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth(
  function middleware(req) {
    // return NextRespose
    console.log(req.url)
  },
  {
    callbacks: {
      authorized({ req, token }) {
        // `/admin` requires Admin role
        if (req.nextUrl.pathname.includes("/admin")) {
          return token?.role === "admin"
        }
        return token
      },
    },
  })

export const config = { matcher: ["/admin", "/admin/:path*","/user","/staff/:path*"] }
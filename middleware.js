import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth(
  function middleware(req) {
    // return NextRespose
    // return NextResponse.rewrite(new URL('/auth/error',req.url))
  },
  {
    callbacks: {
      authorized({ req, token }) {
        // `/admin` requires Admin role
        if (req.nextUrl.pathname.includes("/admin")) {
          return token?.role === "Admin"
        }
        if (req.nextUrl.pathname.includes("/user")) {
          return token?.role === "Staff"
        }
        // `other pages` only requires the user to be logged in
        return token
      },
    },
  })

export const config = { matcher: ["/admin", "/admin/:path*","/user","/user/:path*"] }


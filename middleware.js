// import { withAuth } from "next-auth/middleware"
// import { NextResponse } from "next/server"

// // More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
// export default withAuth(
//   function middleware(req) {
//     // return NextRespose
//     console.log(req.url)
//   },
//   {
//     callbacks: {
//       authorized({ req, token }) {
//         // `/admin` requires Admin role
//         if (req.nextUrl.pathname.includes("/admin")) {
//           return token?.role === "Admin"
//         }
//         return token
//       },
//     },
//   })

// export const config = { matcher: ["/admin", "/admin/:path*","/user","/user/:path*"] }

// middleware.ts
import { NextResponse } from 'next/server'

export function middleware(req) {
  // Example function to validate auth
  if (req.nextUrl.pathname.includes("/admin")) {
    token?.role === 'Admin'
    return NextResponse.next()
  }

  if(req.nextUrl.pathname.includes("/user")){
    token?.role === 'Staff'
    return NextResponse.next()
  }
  
  return NextResponse.redirect(new URL('/auth/error',req.url))
}
export const config = { matcher: ["/admin", "/admin/:path*","/user","/user/:path*"] }
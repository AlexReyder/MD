// import { verifySession } from '@/shared/api/session'
// import { NextRequest, NextResponse } from 'next/server'
// import { isAdmin } from './shared/api/user'
 

// const protectedRoutes = ['/order', '/order-confirm', '/profile', '/profile/general', '/profile/orders', 'profile/password', 'profile/bonus']

// // const publicRoutes = ['/signin', '/signup', '/', '/catalog', '/contacts', '/delivery', '/return', '/cart', '/password-recovery']
 
// export default async function middleware(req: NextRequest) {
//   const path = req.nextUrl.pathname
//   const isProtectedRoute = protectedRoutes.includes(path)
//   // const isPublicRoute = publicRoutes.includes(path)

//   const {isAuth, userId} = await verifySession()

//   if (isProtectedRoute && !isAuth) {
//     return NextResponse.redirect(new URL('/signin', req.nextUrl))
//   }

//   if (path.startsWith('/admin')) {
//       if(!isAuth){
//         return NextResponse.redirect(new URL('/signin', req.nextUrl))
//       }
//       const {success} = await isAdmin(userId as string)
//       if(!success){
//         return NextResponse.redirect(new URL('/signin', req.nextUrl))
//       }
//   }

//   return NextResponse.next()
// }
 
// // Routes Middleware should not run on
// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
// }
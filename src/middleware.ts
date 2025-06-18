export { default } from 'next-auth/middleware'

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { getToken } from "next-auth/jwt";



// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    // console.log(token);
    if (!token) {
        const url = new URL(req.url);
        const redirectUrl = `${url.pathname.slice(1)}${url.search}${url.hash}`;
        // console.log(redirectUrl)
        // const encodedUrl = encodeURIComponent(redirectUrl);
        // console.log(encodedUrl)
        const response = NextResponse.redirect(new URL('/login', req.url));
        response.cookies.set('redirectUrl', redirectUrl);
        // return NextResponse.redirect(new URL('/login', req.url))
        return response;
    }

    // if (token.) {
    //     return NextResponse.next();
    // }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/emd/:path*', 
        '/toolsList/:path*', 
        '/borrow/:path*', 
        '/groupList/:path*', 
        '/bottow/:path*', 
        '/g/:path*', 
        '/BorrowDetail/:path*', 
    ]
}
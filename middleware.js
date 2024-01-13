import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request) {
    const path = request.nextUrl.pathname;

    const isPublic = path === '/login' || path === '/signup' || path === '/';
    const token = request.cookies.get('token')?.value || '';

    if (!isPublic && !token) {
        // Redirect to login if trying to access a protected route without a token
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

    if (isPublic && token) {
        // Redirect to task page if trying to access a public route with a token
        return NextResponse.redirect(new URL('/task', request.nextUrl));
    }

}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        '/login',
        '/signup',
        '/task'
    ]
};

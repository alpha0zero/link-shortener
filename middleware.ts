import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Link } from '@prisma/client'


export async function middleware(request: NextRequest) {

    if (request.nextUrl.pathname.startsWith('/api')) {
        return
    }

    if(request.nextUrl.pathname !== '/' && request.nextUrl.pathname !== '/links') {

        const slug = request.nextUrl.pathname.split('/').pop()
            
        const link: Link = await (await fetch(`${request.nextUrl.origin}/api/links/${slug}`)).json()

        if (!link) return NextResponse.next()
        return NextResponse.redirect(link.url)
    }
}


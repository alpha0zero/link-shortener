import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Link } from '@prisma/client'


export async function middleware(request: NextRequest) {

    if (request.nextUrl.pathname.startsWith('/api')) {

        console.log('we\'re returning');
        return
        
    }

    if(request.nextUrl.pathname !== '/') {

        const slug = request.nextUrl.pathname.split('/').pop()
        console.log(slug);
            
        const link: Link = await (await fetch(`${request.nextUrl.origin}/api/${slug}`)).json()

        if (!link) return NextResponse.next()
        return NextResponse.redirect(link.url)
    }
}


import { getAuth, withClerkMiddleware } from '@clerk/nextjs/server'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { PATHS, PUBLIC_PAGES } from '@/constants'

const isPublic = (path: string) => {
    return PUBLIC_PAGES.find((x) => path.includes(x))
}

const isImage = (path: string) => path.includes('.png') || path.includes('.jpg') || path.includes('.webp')

export default withClerkMiddleware((request: NextRequest) => {
    const { userId } = getAuth(request)
    const path = request.nextUrl.pathname

    if (isPublic(path) || isImage(path)) {
        return NextResponse.next()
    }

    if (!userId) {
        const signInUrl = new URL(PATHS.SIGN_IN, request.url)
        signInUrl.searchParams.set('redirect_url', request.url)
        return NextResponse.redirect(signInUrl)
    }

    return NextResponse.next()
})

export const config = { matcher: '/((?!_next/image|_next/static|favicon.ico|api).*)' }

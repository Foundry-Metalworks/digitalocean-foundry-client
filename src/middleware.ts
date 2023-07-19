import { PUBLIC_PAGES } from '@/constants'
import { authMiddleware } from '@clerk/nextjs/server'

export default authMiddleware({
    publicRoutes: PUBLIC_PAGES,
})

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}

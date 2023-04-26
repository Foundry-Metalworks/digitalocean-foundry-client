export const AUTH_PAGES = ['/sign-in/[[...index]]', '/sign-up/[[...index]]']
export const PUBLIC_PAGES = [...AUTH_PAGES, '/', '/home']

export const PATHS = {
    SETUP: '/setup',
    HOME: '/home',
    PANEL: '/panel',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    JOIN: '/join/[inviteToken]',
}

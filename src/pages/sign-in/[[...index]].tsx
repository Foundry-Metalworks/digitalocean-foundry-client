import React from 'react'

import { SignIn } from '@clerk/nextjs'

import MainLayout from '@/components/layouts/main'
import { PATHS } from '@/constants'

const SignInPage = (): React.ReactNode => {
    return (
        <MainLayout showLogo={false}>
            <SignIn
                path="/sign-in"
                routing="path"
                signUpUrl="/sign-up"
                appearance={{
                    elements: { footerActionText: { fontSize: '1rem' }, footerActionLink: { fontSize: '1rem' } },
                }}
                redirectUrl={PATHS.PANEL}
            />
        </MainLayout>
    )
}

export default SignInPage

import React from 'react'

import { SignUp } from '@clerk/nextjs'

import MainLayout from '@/components/layouts/main'
import { PATHS } from '@/constants'

const SignUpPage = (): React.ReactNode => {
    return (
        <MainLayout showLogo={false}>
            <SignUp
                path="/sign-up"
                routing="path"
                afterSignUpUrl="/setup"
                appearance={{
                    elements: { footerActionText: { fontSize: '1rem' }, footerActionLink: { fontSize: '1rem' } },
                }}
                redirectUrl={PATHS.HOME}
            />
        </MainLayout>
    )
}

export default SignUpPage

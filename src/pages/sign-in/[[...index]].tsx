import React from 'react'

import { SignIn } from '@clerk/nextjs'

const SignInPage = (): React.ReactNode => {
    return (
        <SignIn
            path="/sign-in"
            routing="path"
            signUpUrl="/sign-up"
            appearance={{
                elements: { footerActionText: { fontSize: '1rem' }, footerActionLink: { fontSize: '1rem' } },
            }}
        />
    )
}

export default SignInPage

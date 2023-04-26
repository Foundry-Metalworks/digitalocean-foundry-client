import React from 'react'

import { SignUp } from '@clerk/nextjs'

const SignUpPage = (): React.ReactNode => {
    return (
        <SignUp
            path="/sign-up"
            routing="path"
            afterSignUpUrl="/setup"
            appearance={{
                elements: { footerActionText: { fontSize: '1rem' }, footerActionLink: { fontSize: '1rem' } },
            }}
        />
    )
}

export default SignUpPage

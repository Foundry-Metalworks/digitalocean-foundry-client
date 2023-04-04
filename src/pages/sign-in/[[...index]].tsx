import React from 'react'

import { SignIn } from '@clerk/nextjs'

const SignInPage = (): React.ReactNode => {
    return <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
}

export default SignInPage

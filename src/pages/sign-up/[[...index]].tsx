import React from 'react'

import { SignUp } from '@clerk/nextjs'

const SignUpPage = (): React.ReactNode => {
    return <SignUp path="/sign-up" routing="path" afterSignUpUrl="/setup" />
}

export default SignUpPage

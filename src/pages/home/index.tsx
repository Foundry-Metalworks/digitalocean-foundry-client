import React from 'react'

import { NextPage } from 'next'

import FAQ from '@/components/pages/home/faq'
import HomepageHero from '@/components/pages/home/hero'
import Steps from '@/components/pages/home/steps'
import { useUser } from '@/hooks/api/use-user'
import { useAuth } from '@clerk/nextjs'

const Home: NextPage = () => {
    const { data: user, isLoading } = useUser()
    const { isSignedIn } = useAuth()
    const hasServer = !!user?.servers?.length
    const isAuthorized = !!user?.authorized

    return (
        <div>
            <br />
            <HomepageHero
                isSignedIn={!!isSignedIn}
                hasServer={hasServer}
                isAuthorized={isAuthorized}
                isLoading={isLoading}
            />
            <Steps isSignedIn={!!isSignedIn} hasServer={hasServer} isAuthorized={isAuthorized} isLoading={true} />
            <FAQ />
        </div>
    )
}

export default Home

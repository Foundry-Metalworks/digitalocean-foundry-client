import React from 'react'

import { NextPage } from 'next'

import FAQ from '@/components/pages/home/faq'
import HomepageHero from '@/components/pages/home/hero'
import Steps from '@/components/pages/home/steps'
import { useUser } from '@/hooks/use-user'
import { useAuth } from '@clerk/nextjs'

const Home: NextPage = () => {
    const { data: user } = useUser()
    const { isSignedIn } = useAuth()
    const hasServer = !!user?.servers?.length
    const isAuthorized = !!user?.authorized

    return (
        <div>
            <HomepageHero isSignedIn={!!isSignedIn} hasServer={hasServer} isAuthorized={isAuthorized} />
            <Steps isSignedIn={!!isSignedIn} hasServer={hasServer} isAuthorized={isAuthorized} />
            <FAQ />
        </div>
    )
}

export default Home

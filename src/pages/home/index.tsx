import React from 'react'

import { NextPage } from 'next'

import FAQ from '@/components/pages/home/faq'
import HomepageHero from '@/components/pages/home/hero'
import Steps from '@/components/pages/home/steps'

const Home: NextPage = () => {
    return (
        <div>
            <HomepageHero />
            <Steps />
            <FAQ />
        </div>
    )
}

export default Home

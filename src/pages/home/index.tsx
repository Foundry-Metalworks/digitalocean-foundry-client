import React from 'react'

import { NextPage } from 'next'

import FAQ from '@/components/home/faq'
import HomepageHero from '@/components/home/hero'
import Steps from '@/components/home/steps'
import MainLayout from '@/components/layouts/main'

const Home: NextPage = () => {
    return (
        <MainLayout showLogo={false}>
            <HomepageHero />
            <Steps />
            <FAQ />
        </MainLayout>
    )
}

export default Home

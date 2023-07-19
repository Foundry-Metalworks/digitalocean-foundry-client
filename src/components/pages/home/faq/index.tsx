import React from 'react'

import { Accordion } from '@mantine/core'

import Link from '@/components/kit/link'
import Section from '@/components/pages/home/section'

const FAQ: React.FC = () => {
    return (
        <Section title="Frequently Asked Questions" id="faq">
            <Accordion variant="separated">
                <Accordion.Item value={'token-safety'}>
                    <Accordion.Control>{"What's DigitalOcean?"}</Accordion.Control>
                    <Accordion.Panel>
                        {`DigitalOcean is a hosting provider! Metalworks uses it to get you the cheapest hosting possible`}
                    </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value={'account-safety'}>
                    <Accordion.Control>{'Is my account info safe?'}</Accordion.Control>
                    <Accordion.Panel>
                        Yes! User auth is handled by{' '}
                        <Link href="https://clerk.com/">
                            <strong>Clerk</strong>
                        </Link>
                        , a trusted user auth toolkit. Your DigitalOcean token is encrypted and stored in a secure
                        database
                    </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value={'payment-info'}>
                    <Accordion.Control>{'How is payment handled?'}</Accordion.Control>
                    <Accordion.Panel>
                        {`Metalworks does not collect any money from you! Payment is directly handled on DigitalOcean. We are non-profit!`}
                    </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value={'pricing'}>
                    <Accordion.Control>{'How much does it cost?'}</Accordion.Control>
                    <Accordion.Panel>
                        {`We do not collect a penny from you, but the cost on DigitalOcean will vary based on your usage. If you play 4 4-hour sessions a month, it will cost less than $0.15 USD. Even if the server stays on all month, its still only $6 USD`}
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </Section>
    )
}

export default FAQ

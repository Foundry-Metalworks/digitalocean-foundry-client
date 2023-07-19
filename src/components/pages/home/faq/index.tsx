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
                        {`DigitalOcean is a hosting provider! Metalworks uses it to provide you the cheapest hosting possible.`}
                    </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value={'account-safety'}>
                    <Accordion.Control>{'Is my account info safe?'}</Accordion.Control>
                    <Accordion.Panel>
                        Yes! User auth is handled by{' '}
                        <Link href="https://clerk.com/">
                            <strong>Clerk</strong>
                        </Link>
                        . DigitalOcean auth data is stored encrypted in a secure database.
                        <br />
                        You can also revoke your DigitalOcean token at anytime
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
                        {`DigitalOcean charges $0.00893/hr. If you play for 4 4-hour sessions a month, it'll cost you just $0.14! `}
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </Section>
    )
}

export default FAQ

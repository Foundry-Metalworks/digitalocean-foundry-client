import React, { PropsWithChildren } from 'react'

import NextLink, { LinkProps } from 'next/link'

import styles from './styles.module.scss'

const Link: React.FC<PropsWithChildren<LinkProps>> = ({
    as,
    children,
    href,
    replace,
    scroll,
    shallow,
    passHref = true,
    legacyBehavior = false,
}: PropsWithChildren<LinkProps>) => {
    return (
        <NextLink
            className={styles.link}
            href={href}
            as={as}
            replace={replace}
            scroll={scroll}
            shallow={shallow}
            passHref={passHref}
            legacyBehavior={legacyBehavior}
        >
            {children}
        </NextLink>
    )
}

export default Link

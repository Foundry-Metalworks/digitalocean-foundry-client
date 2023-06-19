import React, { PropsWithChildren } from 'react'

import NextLink, { LinkProps } from 'next/link'

const Link: React.FC<PropsWithChildren<LinkProps>> = ({
    as,
    children,
    href,
    replace,
    scroll,
    shallow,
    passHref = true,
    legacyBehavior = true,
}: PropsWithChildren<LinkProps>) => {
    return (
        <NextLink
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

import React from 'react'

import NextLink, { LinkProps } from 'next/link'

function Link({
    as,
    children,
    href,
    replace,
    scroll,
    shallow,
    passHref = true,
    legacyBehavior = true,
}: LinkProps): React.ReactNode {
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

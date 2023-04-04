module.exports = {
    httpAgentOptions: {
        keepAlive: false,
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${process.env.BFF_ENDPOINT}/api/:path*`,
            },
        ]
    },
    experimental: {
        proxyTimeout: 60_000,
    },
}

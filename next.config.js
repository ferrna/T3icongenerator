/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

const cspHeader = `
    default-src 'self';
    script-src 'self https://checkout.stripe.com' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self https://*.stripe.com' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
    frame-src 'https://checkout.stripe.com';
    connect-src 'https://checkout.stripe.com';
`

/** @type {import("next").NextConfig} */
const config = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
            port: '',
            pathname: '/**',
        },
          {
            protocol: 'https',
            hostname: 'oaidalleapiprodscus.blob.core.windows.net',
            port: '',
            pathname: '/**',
          },
        ],
  },
  /* async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },
        ],
      },
    ]
  }, */
};

export default config;

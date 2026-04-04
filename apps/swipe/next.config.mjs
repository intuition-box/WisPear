import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@wispr/ontology"],
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.walletconnect.com https://*.walletconnect.org https://*.reown.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.reown.com",
              "font-src 'self' https://fonts.gstatic.com https://fonts.reown.com",
              "img-src 'self' data: blob: https://*.walletconnect.com https://*.walletconnect.org https://*.reown.com",
              "frame-src https://*.walletconnect.com https://*.walletconnect.org https://*.reown.com",
              "connect-src 'self' https://*.walletconnect.com https://*.walletconnect.org https://*.reown.com wss://*.walletconnect.com wss://*.walletconnect.org https://rpc.intuition.systems https://explorer.intuition.systems",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default withPWA(nextConfig);

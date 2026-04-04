import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@wispr/ontology", "@wispr/ui", "@wispr/wallet"],
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default withPWA(nextConfig);

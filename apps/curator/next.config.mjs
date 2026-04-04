/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@wispr/ontology", "@wispr/wallet", "@wispr/ui", "@wispr/feedback-api"],
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "@react-native-async-storage/async-storage": false,
      "pino-pretty": false,
      "lokijs": false,
      "encoding": false,
    };
    return config;
  },
};

export default nextConfig;

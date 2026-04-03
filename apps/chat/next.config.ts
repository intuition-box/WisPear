import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@wispr/agent", "@wispr/ontology"],
};

export default nextConfig;

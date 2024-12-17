import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    devIndicators: {
        buildActivity: false,
    },
    output: "standalone"
};

export default nextConfig;

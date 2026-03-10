/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "10.10.10.70",
        port: "3033",
        pathname: "/public/uploads/**",
      },
    ],
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    mdxRs: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  // allow username pictures to be fetched from any external domain
  images: {
    remotePatterns: [
      {
        protocol: "https",
        domain: "*",
      },
      {
        protocol: "http",
        domain: "*",
      },
    ],
  },
}

module.exports = nextConfig

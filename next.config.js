/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com,d11di5ixegvag7.cloudfront.net,via.placeholder.com",
    ],
    // Optionally, you can also use remotePatterns for more specific control
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "d11di5ixegvag7.cloudfront.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/u/**",
      },
      {
        protocol: "https",
        hostname: "opengraph.githubassets.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.contenthook.dev",
        port: "",
        pathname: "/**",
      },
    ],
  },
  redirects: async () => {
    return [
      {
        source: "/socials/github.com",
        destination: "https://github.com/binary-blazer/portfolio",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure shared UI package is compiled and its Tailwind classes work
  transpilePackages: ["@repo/ui"],
};

export default nextConfig;

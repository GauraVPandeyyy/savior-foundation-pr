/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "upload.wikimedia.org" },
    ],
  },
  async redirects() {
    return [
      { source: "/health-camps", destination: "/health-support#health-camps", permanent: true },
      { source: "/women-child-health", destination: "/health-support#women-child-health", permanent: true },
      { source: "/womens-health", destination: "/health-support#women-child-health", permanent: true },
      { source: "/child-welfare", destination: "/health-support#women-child-health", permanent: true },
      { source: "/disability-patient-support", destination: "/health-support#disability-patient-support", permanent: true },
      { source: "/disability-support", destination: "/health-support#disability-patient-support", permanent: true },
      { source: "/volunteer", destination: "/get-involved", permanent: true },
      { source: "/medical-volunteer", destination: "/get-involved", permanent: true },
      { source: "/partners", destination: "/get-involved", permanent: true },
      { source: "/host-health-camp", destination: "/get-involved", permanent: true },
      { source: "/stories/:path*", destination: "/impact", permanent: true },
      { source: "/updates/:path*", destination: "/impact", permanent: true },
      { source: "/gallery", destination: "/impact", permanent: true },
      { source: "/disclaimer", destination: "/medical-disclaimer", permanent: true },
    ];
  },
};
export default nextConfig;

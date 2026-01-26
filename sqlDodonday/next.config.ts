import type { NextConfig } from "next";
const imgRemoteHosts = [
'pbs.twimg.com',
'mulqhihyyqaszphmrysv.supabase.co',
'cdn.pixabay.com'
]


const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns:
      imgRemoteHosts.map((hostname) => ({
         protocol: 'https',
         hostname,
          pathname: '/**',
      }))
  },
};

export default nextConfig;

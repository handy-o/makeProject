import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  // 메인을 / 로 옮김 → 예전 주소 /donday 로 들어오면 / 로 보냄 (/donday/[id] 상세는 그대로)
  async redirects() {
    return [
      { source: '/donday', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;

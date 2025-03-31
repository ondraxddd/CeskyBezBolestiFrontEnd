
const nextConfig= {
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    experimental: {
      // Required for modern module handling
      // esmExternals: 'loose',
      // Optional but recommended
      externalDir: true
    }
  };
  
module.exports = nextConfig

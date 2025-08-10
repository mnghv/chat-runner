import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    // Enable React strict mode for better development experience
    reactStrictMode: true,

    // Optimize images
    images: {
        formats: ['image/webp', 'image/avif'],
        minimumCacheTTL: 60,
        dangerouslyAllowSVG: true,
        contentSecurityPolicy:
            "default-src 'self'; script-src 'none'; sandbox;",
    },

    // Enable experimental features for better performance
    experimental: {
        // Enable optimized package imports
        optimizePackageImports: ['@heroicons/react'],
    },

    // Webpack optimizations
    webpack: (config, { dev, isServer }) => {
        // Optimize bundle size
        if (!dev && !isServer) {
            config.optimization = {
                ...config.optimization,
                splitChunks: {
                    chunks: 'all',
                    cacheGroups: {
                        vendor: {
                            test: /[\\/]node_modules[\\/]/,
                            name: 'vendors',
                            chunks: 'all',
                        },
                        common: {
                            name: 'common',
                            minChunks: 2,
                            chunks: 'all',
                            enforce: true,
                        },
                    },
                },
            };
        }

        // Optimize for production
        if (!dev) {
            config.optimization.minimize = true;
        }

        return config;
    },

    // Compression and caching headers
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                ],
            },
            {
                source: '/static/(.*)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
        ];
    },

    // Enable compression
    compress: true,

    // Enable source maps in development only
    productionBrowserSourceMaps: false,

    // Optimize bundle analyzer
    ...(process.env.ANALYZE === 'true' && {
        webpack: (config: any) => {
            const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
            config.plugins.push(
                new BundleAnalyzerPlugin({
                    analyzerMode: 'static',
                    openAnalyzer: false,
                })
            );
            return config;
        },
    }),
};

export default nextConfig;

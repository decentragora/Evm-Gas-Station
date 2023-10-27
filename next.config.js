/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['images.unsplash.com', 'res.cloudinary.com'],
    },
    env: {
        INFURA_ID: process.env.INFURA_ID,
        ANKR_ID: process.env.ANKR_ID,
        GNOSIS_SCAN_API_KEY: process.env.GNOSIS_SCAN_API_KEY,
        MOON_SCAN_API_KEY: process.env.MOON_SCAN_API_KEY,
    },
}

module.exports = nextConfig

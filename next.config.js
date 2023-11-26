// Key Points to Remember:

//     - Central Configuration: next.config.js is where you define global configurations for your Next.js project.
//     - Environment Variables: Set environment variables here for use across your application.
//     - Webpack Customization: Modify or extend the Webpack configuration for advanced customization.
//     - React Strict Mode: Enable it here to catch potential issues in your React components.
//     - Internationalization: Configure locale and translation settings for multi-language support.
//     - Image Optimization: Control how Next.js optimizes images.
//     - Flexible and Extensible: You can add or modify configurations as your project grows.

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // Enable React Strict Mode
    // Add more configurations as needed
  }
  
  module.exports = nextConfig
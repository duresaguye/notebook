// filepath: /home/dura/web/digital/digital-note/tailwind.config.temp.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./components/**/*.{js,ts,jsx,tsx,mdx}"], // You can adjust the content paths
    plugins: [require("@tailwindcss/typography")],
    corePlugins: false, // Disable core plugins to only get typography styles
  };
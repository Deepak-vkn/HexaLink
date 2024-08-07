// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      padding: {
        '18': '4.5rem', // 72px
        '20': '5rem',  // 80px
        '24': '6rem',  // 96px
        // Add any other custom padding values here
      },
    },
  },
  plugins: [],
}

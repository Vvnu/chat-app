/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",  // IMPORTANT:  Tell Tailwind where your files are!
  ],
  theme: {
    extend: {
      colors: {
        // Example custom colors (you can add/modify these)
        primary: '#6366f1',
        secondary: '#f3f4f6',
        accent: '#e5e7eb',
        background: '#ffffff',
        foreground: '#1a1a1a',
      },
      fontFamily: {
        sans: ['system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        'sm': '0.125rem',  // Example:  4px
        'md': '0.25rem',  // Example:  8px
        'lg': '0.375rem', // Example: 12px
        'xl': '0.5rem',   // Example: 16px
      },
    },
  },
  plugins: [], // You can add Tailwind plugins here
  darkMode: 'class', // Enable dark mode via class name (e.g., <html class="dark">)
};

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        title: ["'Audiowide', cursive"],
      },
      backgroundImage: {
        hero: "url('/public/images/bg_main.png')",
        body: "url('/public/images/bg_body.png')",
        footer: "url('/public/images/bg_footer.png')",
        categories: "url('/public/images/bg_categories.png')",
      },
    },
  },
  plugins: [],
};

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
      },
    },
  },
  plugins: [],
};

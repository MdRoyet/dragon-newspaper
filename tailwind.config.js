module.exports = {
  // ... rest of your config
  plugins: [require("daisyui")],
  // This part is crucial
  daisyui: {
    themes: ["light", "dark", "cupcake"], // List the themes you want to use
  },
};

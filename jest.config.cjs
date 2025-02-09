const { defaults } = require("jest-config");
require("dotenv").config(); // Add this line to load environment variables

module.exports = {
  ...defaults,
  transform: {
    "^.+\\.js$": "babel-jest", // Use babel-jest for transforming ES modules
  },
  testEnvironment: "node", // Set to 'node' for Node.js environment
  globals: {
    "babel-jest": {
      useBabelrc: true,
    },
  },
  setupFiles: ["dotenv/config"], // Add this line to load environment variables before tests
};

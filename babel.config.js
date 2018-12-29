module.exports = api => {
  api.cache(false)
  return {
    presets: ["@babel/react"],
    plugins: [
      [
        "styled-jsx/babel",
        {
          vendorPrefixes: false
        }
      ],
      "@babel/plugin-proposal-object-rest-spread"
    ],
    env: {
      test: {
        presets: ["@babel/env"],
      }
    }
  }
}

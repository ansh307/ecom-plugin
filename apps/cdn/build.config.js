const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: ["./apps/cdn/src/index.js"], // Entry point for your plugin
    bundle: true, // Bundle everything into a single file
    outfile: "./apps/cdn/dist/plugin.v1.js", // Output file for the CDN
    minify: true, // Minify the output
    sourcemap: true, // Generate source maps for debugging
    loader: {
      ".css": "text", // Handle CSS as text
    },
    globalName: "GetUrSize", // Global variable name to avoid collisions
    target: ["esnext"], // ESNext to use modern JavaScript features
  })
  .catch(() => process.exit(1)); // Exit on error

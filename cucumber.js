module.exports = {
  default: {
    // Where to find feature files
    paths: ["src/features/**/*.feature"],

    // Where to find step definitions
    require: ["src/features/step-definitions/**/*.ts"],

    // Use ts-node to run TypeScript directly
    requireModule: ["ts-node/register"],

    // Output format
    format: ["progress-bar", "html:reports/cucumber-report.html"],

    // Show full error messages
    formatOptions: { snippetInterface: "async-await" },
  },
};

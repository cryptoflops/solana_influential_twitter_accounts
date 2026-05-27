const fs = require('fs');
const path = require('path');

function main() {
  const workspaceDir = "user/solana-twitter-research";
  const jsonFilePath = path.join(workspaceDir, "data.json");
  const templateFilePath = path.join(workspaceDir, "dashboard_template.html");
  const outputHtmlPath = path.join(workspaceDir, "index.html");

  if (!fs.existsSync(jsonFilePath)) {
    console.error(`Error: data.json does not exist. Run merge_data.js first.`);
    return;
  }

  if (!fs.existsSync(templateFilePath)) {
    console.error(`Error: dashboard_template.html does not exist.`);
    return;
  }

  const dataContent = fs.readFileSync(jsonFilePath, 'utf8');
  let templateContent = fs.readFileSync(templateFilePath, 'utf8');

  // Replace data placeholder
  const compiledContent = templateContent.replace('/* DATA_PLACEHOLDER */', dataContent);

  fs.writeFileSync(outputHtmlPath, compiledContent, 'utf8');
  console.log(`Successfully compiled and saved live dashboard to ${outputHtmlPath}`);
}

main();

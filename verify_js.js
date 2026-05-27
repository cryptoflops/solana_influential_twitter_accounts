const fs = require('fs');
const path = require('path');
const vm = require('vm');

function main() {
  const workspaceDir = "user/solana-twitter-research";
  const htmlPath = path.join(workspaceDir, "index.html");

  if (!fs.existsSync(htmlPath)) {
    console.error("index.html does not exist!");
    process.exit(1);
  }

  const html = fs.readFileSync(htmlPath, 'utf8');

  // Extract <script> content (excluding the CDN import)
  const scriptRegex = /<script>([\s\S]*?)<\/script>/g;
  let match;
  let found = false;

  while ((match = scriptRegex.exec(html)) !== null) {
    const jsCode = match[1];
    if (jsCode.trim().length === 0) continue;

    console.log(`Checking syntax of script block (${jsCode.trim().substring(0, 100).replace(/\n/g, ' ')}...)...`);
    
    try {
      // Parse the script without executing it to verify syntax
      new vm.Script(jsCode);
      console.log("✓ JavaScript syntax is valid!");
      found = true;
    } catch (e) {
      console.error("✗ JavaScript syntax error:");
      console.error(e);
      process.exit(1);
    }
  }

  if (!found) {
    console.error("No javascript script block found in index.html!");
    process.exit(1);
  }

  console.log("All verification checks passed successfully!");
}

main();

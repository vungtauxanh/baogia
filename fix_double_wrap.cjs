const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/templates');
const files = fs.readdirSync(dir).filter(f => f.endsWith('Template.tsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix double wrapping
  content = content.replace(/\{\!isHandoverMode && \(\s*<>\s*\{\!isHandoverMode && \(\s*<>\s*(.*?)\s*<\/>\s*\)\}\s*<\/>\s*\)\}/gs, '{!isHandoverMode && (\n                    <>\n                      $1\n                    </>\n                  )}');

  fs.writeFileSync(filePath, content);
});

console.log('Done');

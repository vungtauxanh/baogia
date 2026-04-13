const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/templates');
const files = fs.readdirSync(dir);

files.forEach(file => {
  if (file.endsWith('.tsx')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find the start of the interactive controls overlay
    const startIdx = content.indexOf('{/* Interactive controls overlay (hidden when printing) */}');
    const endIdx = content.indexOf('<Reorder.Group axis="y"');
    
    if (startIdx !== -1 && endIdx !== -1 && startIdx < endIdx) {
      const before = content.substring(0, startIdx);
      const after = content.substring(endIdx);
      
      // If there are decorative blocks between them, we need to keep them
      // Let's just use regex to remove the specific div
      const newContent = content.replace(/{\/\* Interactive controls overlay \(hidden when printing\) \*\/}[\s\S]*?(?=({\/\* Decorative|<Reorder\.Group axis="y"))/, '{/* Interactive controls overlay (hidden when printing) */}\n      ');
      
      fs.writeFileSync(filePath, newContent);
    }
  }
});
console.log('Done');

const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/templates');
const files = fs.readdirSync(dir);

files.forEach(file => {
  if (file.endsWith('.tsx')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    content = content.replace(/-left-16/g, '-left-32');
    
    fs.writeFileSync(filePath, content);
  }
});
console.log('Done');

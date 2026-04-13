const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/templates');
const files = fs.readdirSync(dir);

files.forEach(file => {
  if (file.endsWith('.tsx')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace mb-2 with mb-0 for "Đại diện đơn vị cung cấp"
    content = content.replace(/mb-2(">Đại diện đơn vị cung cấp<\/p>)/g, 'mb-0$1');
    
    fs.writeFileSync(filePath, content);
  }
});
console.log('Done');

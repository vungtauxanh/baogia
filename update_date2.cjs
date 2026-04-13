const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/templates');

const replaceInFile = (filename, regex, replacement) => {
  const filePath = path.join(dir, filename);
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(regex, replacement);
  fs.writeFileSync(filePath, content);
};

replaceInFile('TechTemplate.tsx', /TIMESTAMP: \{new Date\(\)\.toISOString\(\)\}/g, 'TIMESTAMP: {quoteDate}');
replaceInFile('ElegantTemplate.tsx', /\{new Date\(\)\.toLocaleDateString\('vi-VN'\)\}/g, '{quoteDate}');
replaceInFile('NatureTemplate.tsx', /\{new Date\(\)\.toLocaleDateString\('vi-VN'\)\}/g, '{quoteDate}');
replaceInFile('PremiumTemplate.tsx', /\{new Date\(\)\.toLocaleDateString\('vi-VN'\)\}/g, '{quoteDate}');
replaceInFile('CompactTemplate.tsx', /\{new Date\(\)\.toLocaleDateString\('vi-VN'\)\}/g, '{quoteDate}');

console.log('Done');

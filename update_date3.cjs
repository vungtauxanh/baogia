const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/templates');

const replaceInFile = (filename) => {
  const filePath = path.join(dir, filename);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find the destructuring line
  // e.g., const { businessInfo, customerName, items, total, rowSpacing, printOrientation, margins, sectionOrder, sectionSpacing } = data;
  content = content.replace(/const \{([^}]+)\} = data;/g, (match, p1) => {
    if (!p1.includes('quoteDate')) {
      return `const { ${p1.trim()}, quoteDate } = data;`;
    }
    return match;
  });
  
  fs.writeFileSync(filePath, content);
};

['TechTemplate.tsx', 'ElegantTemplate.tsx', 'NatureTemplate.tsx', 'PremiumTemplate.tsx', 'CompactTemplate.tsx'].forEach(replaceInFile);

console.log('Done');

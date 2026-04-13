import fs from 'fs';
import path from 'path';

const templatesDir = path.join(process.cwd(), 'src/components/templates');
const files = fs.readdirSync(templatesDir).filter(f => f.endsWith('Template.tsx'));

files.forEach(file => {
  const filePath = path.join(templatesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  const regex = /const newLayout = currentLayout\.map\(row => \{\s*if \(row\.id === rowId\) \{\s*const newCols = \[\.\.\.row\.columns\];\s*newCols\[colIdx\] = 'empty';\s*return \{ \.\.\.row, columns: newCols \};\s*\}\s*return row;\s*\}\);/g;
  
  const replacement = `const newLayout = currentLayout.map(row => {
                if (row.id === rowId) {
                  const newCols = [...row.columns];
                  newCols.splice(colIdx, 1);
                  return { ...row, columns: newCols };
                }
                return row;
              }).filter(row => row.columns.length > 0);`;

  if (content.match(regex)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  } else {
    console.log(`Could not find match in ${file}`);
  }
});

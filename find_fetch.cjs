const fs = require('fs');
const path = require('path');

function search(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      search(fullPath);
    } else if (fullPath.endsWith('.js')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('fetch =') || content.includes('fetch=')) {
        const lines = content.split('\n');
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].includes('fetch =') || lines[i].includes('fetch=')) {
            console.log(`${fullPath}:${i + 1}: ${lines[i].substring(0, 100)}`);
          }
        }
      }
    }
  }
}

search('node_modules');

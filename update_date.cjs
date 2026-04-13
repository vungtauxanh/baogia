const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/templates');
const files = fs.readdirSync(dir);

files.forEach(file => {
  if (file.endsWith('.tsx')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace type="date"
    content = content.replace(/type="date"/g, 'type="text"\n                placeholder="Nhập ngày tháng..."');
    
    // Replace width w-32 with w-48 for the date input
    // We can just replace w-32 with w-48 in the date input block
    // Actually, let's use a regex to match the input block
    content = content.replace(/(placeholder="Nhập ngày tháng..."[\s\S]*?)w-32/g, '$1w-48');

    // Replace the date formatting
    content = content.replace(/\{quoteDate \? new Date\(quoteDate\)\.toLocaleDateString\('vi-VN'\) : ''\}/g, '{quoteDate}');
    
    fs.writeFileSync(filePath, content);
  }
});

// Also update App.tsx to change the default quoteDate
const appPath = path.join(__dirname, 'src/App.tsx');
let appContent = fs.readFileSync(appPath, 'utf8');
appContent = appContent.replace(/const \[quoteDate, setQuoteDate\] = useState\(new Date\(\)\.toISOString\(\)\.split\('T'\)\[0\]\);/, "const [quoteDate, setQuoteDate] = useState('');");
fs.writeFileSync(appPath, appContent);

console.log('Done');

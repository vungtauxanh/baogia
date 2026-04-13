const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/templates');
const files = fs.readdirSync(dir);

files.forEach(file => {
  if (file.endsWith('.tsx')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace left-full ml-2 with right-full mr-2
    content = content.replace(/absolute left-full ml-2/g, 'absolute right-full mr-2 top-0');
    
    // Also make sure the parent has relative if it doesn't
    content = content.replace(/className="flex flex-col items-center gap-1 relative group\/spacing/g, 'className="flex flex-col items-center gap-1 group/spacing relative');
    
    // Also fix the width and padding to match ClassicTemplate
    content = content.replace(/w-32 cursor-default/g, 'w-48 cursor-default');
    content = content.replace(/p-2 hidden group-hover\/spacing:block/g, 'p-3 hidden group-hover/spacing:block');
    content = content.replace(/<div className="flex justify-between text-\[10px\] mb-1">/g, '<div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase mb-2">');
    content = content.replace(/<span>Giãn cách<\/span>/g, '<span>Giãn cách phần</span>');
    
    fs.writeFileSync(filePath, content);
  }
});
console.log('Done');

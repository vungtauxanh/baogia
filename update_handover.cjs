const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/templates');

const replaceInFile = (filename) => {
  const filePath = path.join(dir, filename);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 1. Add handover mode fields to destructuring
  content = content.replace(/const \{([^}]+)\} = data;/g, (match, p1) => {
    if (!p1.includes('isHandoverMode')) {
      return `const { ${p1.trim()}, isHandoverMode, customerRepresentative, customerPosition } = data;`;
    }
    return match;
  });

  // 2. Change title logic
  content = content.replace(/<h2 className="font-bold text-3xl uppercase tracking-wide">BẢNG BÁO GIÁ<\/h2>/g, 
    '<h2 className="font-bold text-3xl uppercase tracking-wide">{isHandoverMode ? "BIÊN BẢN BÀN GIAO" : "BẢNG BÁO GIÁ"}</h2>');
  content = content.replace(/<h2 className="font-black text-4xl text-blue-900 tracking-tight mb-2">BẢNG BÁO GIÁ<\/h2>/g, 
    '<h2 className="font-black text-4xl text-blue-900 tracking-tight mb-2">{isHandoverMode ? "BIÊN BẢN BÀN GIAO" : "BẢNG BÁO GIÁ"}</h2>');
  content = content.replace(/<h2 className="font-black text-4xl text-emerald-800 tracking-tight mb-2">BẢNG BÁO GIÁ<\/h2>/g, 
    '<h2 className="font-black text-4xl text-emerald-800 tracking-tight mb-2">{isHandoverMode ? "BIÊN BẢN BÀN GIAO" : "BẢNG BÁO GIÁ"}</h2>');
  content = content.replace(/<h2 className="font-black text-4xl text-cyan-900 tracking-tight mb-2">BẢNG BÁO GIÁ<\/h2>/g, 
    '<h2 className="font-black text-4xl text-cyan-900 tracking-tight mb-2">{isHandoverMode ? "BIÊN BẢN BÀN GIAO" : "BẢNG BÁO GIÁ"}</h2>');
  content = content.replace(/<h2 className="font-black text-4xl text-gray-900 tracking-tight mb-2">BẢNG BÁO GIÁ<\/h2>/g, 
    '<h2 className="font-black text-4xl text-gray-900 tracking-tight mb-2">{isHandoverMode ? "BIÊN BẢN BÀN GIAO" : "BẢNG BÁO GIÁ"}</h2>');
  content = content.replace(/<h2 className="font-black text-4xl text-white tracking-tight mb-2">BẢNG BÁO GIÁ<\/h2>/g, 
    '<h2 className="font-black text-4xl text-white tracking-tight mb-2">{isHandoverMode ? "BIÊN BẢN BÀN GIAO" : "BẢNG BÁO GIÁ"}</h2>');
  content = content.replace(/<h2 className="font-black text-4xl text-gray-800 tracking-tight mb-2">BẢNG BÁO GIÁ<\/h2>/g, 
    '<h2 className="font-black text-4xl text-gray-800 tracking-tight mb-2">{isHandoverMode ? "BIÊN BẢN BÀN GIAO" : "BẢNG BÁO GIÁ"}</h2>');

  // 3. Hide price/amount columns in handover mode
  // This is tricky because each template has a different table structure.
  // We'll do a basic replacement for ClassicTemplate first to see if it works.
  
  fs.writeFileSync(filePath, content);
};

['ClassicTemplate.tsx', 'BoldTemplate.tsx', 'CorporateTemplate.tsx', 'CreativeTemplate.tsx', 'MinimalistTemplate.tsx', 'ModernTemplate.tsx'].forEach(replaceInFile);

console.log('Done');

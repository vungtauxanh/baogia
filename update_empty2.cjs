const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/templates');

const replaceInFile = (filename) => {
  const filePath = path.join(dir, filename);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace the empty case
  const emptyRegex = /case 'empty':[\s\S]*?rowId, colIdx\n\s*\);/g;
  
  const newEmpty = `case 'empty': {
        const emptyKey = \`empty-\${rowId}-\${colIdx}\`;
        const emptySettings = currentComponentSettings[emptyKey] || {};
        return componentWrapper(
          <div key="empty" className="w-full">
            <textarea
              value={emptySettings.text || ''}
              onChange={(e) => onComponentSettingsChange?.({ ...currentComponentSettings, [emptyKey]: { ...emptySettings, text: e.target.value } })}
              placeholder="Nhập nội dung tự do..."
              className="w-full bg-transparent border border-dashed border-gray-300 print:border-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none overflow-hidden min-h-[2rem] p-1 rounded"
              onInput={(e) => {
                const target = e.target;
                target.style.height = 'auto';
                target.style.height = target.scrollHeight + 'px';
              }}
            />
          </div>,
          rowId, colIdx
        );
      }`;

  content = content.replace(emptyRegex, newEmpty);

  fs.writeFileSync(filePath, content);
};

['ClassicTemplate.tsx', 'BoldTemplate.tsx', 'CorporateTemplate.tsx', 'CreativeTemplate.tsx', 'MinimalistTemplate.tsx', 'ModernTemplate.tsx', 'TechTemplate.tsx', 'NatureTemplate.tsx', 'CompactTemplate.tsx', 'ElegantTemplate.tsx', 'PremiumTemplate.tsx'].forEach(replaceInFile);

console.log('Done');

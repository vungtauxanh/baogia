const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/templates');

const replaceInFile = (filename) => {
  const filePath = path.join(dir, filename);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 1. Customer section
  content = content.replace(
    /<p className="font-bold mt-2">CSKD xin gửi báo giá hàng hóa cụ thể như sau:<\/p>/g,
    `{isHandoverMode && (
              <>
                {customerRepresentative && (
                  <div className={\`flex gap-2 mb-1 \${settings.alignment === 'center' ? 'justify-center' : settings.alignment === 'right' ? 'justify-end' : 'justify-start'}\`}>
                    <span className="italic">Người đại diện:</span>
                    <span className="font-medium">{customerRepresentative}</span>
                  </div>
                )}
                {customerPosition && (
                  <div className={\`flex gap-2 mb-1 \${settings.alignment === 'center' ? 'justify-center' : settings.alignment === 'right' ? 'justify-end' : 'justify-start'}\`}>
                    <span className="italic">Chức vụ:</span>
                    <span className="font-medium">{customerPosition}</span>
                  </div>
                )}
              </>
            )}
            <p className="font-bold mt-2">{isHandoverMode ? 'Hai bên thống nhất bàn giao các hạng mục sau:' : 'CSKD xin gửi báo giá hàng hóa cụ thể như sau:'}</p>`
  );

  // 2. Items table header
  content = content.replace(
    /<th className="border border-black p-2 text-center" style={{ width: `\${columnWidths\?\.price \|\| 15}%` }}>ĐƠN GIÁ<\/th>\s*<th className="border border-black p-2 text-center" style={{ width: `\${columnWidths\?\.amount \|\| 20}%` }}>THÀNH TIỀN<\/th>/g,
    `{!isHandoverMode && (
                    <>
                      <th className="border border-black p-2 text-center" style={{ width: \`\${columnWidths?.price || 15}%\` }}>ĐƠN GIÁ</th>
                      <th className="border border-black p-2 text-center" style={{ width: \`\${columnWidths?.amount || 20}%\` }}>THÀNH TIỀN</th>
                    </>
                  )}`
  );
  
  // Replace other table headers that might not have border-black
  content = content.replace(
    /<th className="p-3 text-center text-sm font-bold text-gray-700" style={{ width: `\${columnWidths\?\.price \|\| 15}%` }}>ĐƠN GIÁ<\/th>\s*<th className="p-3 text-center text-sm font-bold text-gray-700" style={{ width: `\${columnWidths\?\.amount \|\| 20}%` }}>THÀNH TIỀN<\/th>/g,
    `{!isHandoverMode && (
                    <>
                      <th className="p-3 text-center text-sm font-bold text-gray-700" style={{ width: \`\${columnWidths?.price || 15}%\` }}>ĐƠN GIÁ</th>
                      <th className="p-3 text-center text-sm font-bold text-gray-700" style={{ width: \`\${columnWidths?.amount || 20}%\` }}>THÀNH TIỀN</th>
                    </>
                  )}`
  );
  
  content = content.replace(
    /<th className="p-3 text-center text-sm font-bold text-white" style={{ width: `\${columnWidths\?\.price \|\| 15}%` }}>ĐƠN GIÁ<\/th>\s*<th className="p-3 text-center text-sm font-bold text-white" style={{ width: `\${columnWidths\?\.amount \|\| 20}%` }}>THÀNH TIỀN<\/th>/g,
    `{!isHandoverMode && (
                    <>
                      <th className="p-3 text-center text-sm font-bold text-white" style={{ width: \`\${columnWidths?.price || 15}%\` }}>ĐƠN GIÁ</th>
                      <th className="p-3 text-center text-sm font-bold text-white" style={{ width: \`\${columnWidths?.amount || 20}%\` }}>THÀNH TIỀN</th>
                    </>
                  )}`
  );
  
  content = content.replace(
    /<th className="p-3 text-center text-sm font-bold text-emerald-900" style={{ width: `\${columnWidths\?\.price \|\| 15}%` }}>ĐƠN GIÁ<\/th>\s*<th className="p-3 text-center text-sm font-bold text-emerald-900" style={{ width: `\${columnWidths\?\.amount \|\| 20}%` }}>THÀNH TIỀN<\/th>/g,
    `{!isHandoverMode && (
                    <>
                      <th className="p-3 text-center text-sm font-bold text-emerald-900" style={{ width: \`\${columnWidths?.price || 15}%\` }}>ĐƠN GIÁ</th>
                      <th className="p-3 text-center text-sm font-bold text-emerald-900" style={{ width: \`\${columnWidths?.amount || 20}%\` }}>THÀNH TIỀN</th>
                    </>
                  )}`
  );
  
  content = content.replace(
    /<th className="p-3 text-center text-sm font-bold text-cyan-900" style={{ width: `\${columnWidths\?\.price \|\| 15}%` }}>ĐƠN GIÁ<\/th>\s*<th className="p-3 text-center text-sm font-bold text-cyan-900" style={{ width: `\${columnWidths\?\.amount \|\| 20}%` }}>THÀNH TIỀN<\/th>/g,
    `{!isHandoverMode && (
                    <>
                      <th className="p-3 text-center text-sm font-bold text-cyan-900" style={{ width: \`\${columnWidths?.price || 15}%\` }}>ĐƠN GIÁ</th>
                      <th className="p-3 text-center text-sm font-bold text-cyan-900" style={{ width: \`\${columnWidths?.amount || 20}%\` }}>THÀNH TIỀN</th>
                    </>
                  )}`
  );

  // 3. Totals section
  content = content.replace(/case 'totals':\n\s*return componentWrapper\(/g, "case 'totals':\n        if (isHandoverMode) return null;\n        return componentWrapper(");

  fs.writeFileSync(filePath, content);
};

['BoldTemplate.tsx', 'CorporateTemplate.tsx', 'CreativeTemplate.tsx', 'MinimalistTemplate.tsx', 'ModernTemplate.tsx'].forEach(replaceInFile);

console.log('Done');

const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/templates');

const replaceInFile = (filename) => {
  const filePath = path.join(dir, filename);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 1. Signature section
  content = content.replace(
    /<div key="signature" className="text-center w-64 mx-auto">\s*<p className="font-bold mb-0">Đại diện đơn vị cung cấp<\/p>\s*\{businessInfo\.signature \? \(\s*<img\s*src=\{businessInfo\.signature\}\s*alt="Signature"\s*className="mx-auto object-contain"\s*style=\{\{ height: businessInfo\.signatureSize \? `\$\{businessInfo\.signatureSize\}px` : '96px' \}\}\s*\/>\s*\) : \(\s*<div style=\{\{ height: businessInfo\.signatureSize \? `\$\{businessInfo\.signatureSize\}px` : '96px' \}\}><\/div>\s*\)\}\s*<\/div>/g,
    `<div key="signature" className={\`flex \${isHandoverMode ? 'justify-between' : 'justify-end'} w-full mt-8\`}>
            {isHandoverMode && (
              <div className="text-center w-64">
                <p className="font-bold mb-0">ĐẠI DIỆN BÊN B (BÊN NHẬN)</p>
                {customerRepresentative && <p className="italic text-sm">{customerRepresentative}</p>}
                <div style={{ height: '96px' }}></div>
              </div>
            )}
            <div className="text-center w-64">
              <p className="font-bold mb-0">{isHandoverMode ? 'ĐẠI DIỆN BÊN A (BÊN GIAO)' : 'Đại diện đơn vị cung cấp'}</p>
              {businessInfo.representativeName && isHandoverMode && <p className="italic text-sm">{businessInfo.representativeName}</p>}
              {businessInfo.signature ? (
                <img 
                  src={businessInfo.signature} 
                  alt="Signature" 
                  className="mx-auto object-contain" 
                  style={{ height: businessInfo.signatureSize ? \`\${businessInfo.signatureSize}px\` : '96px' }}
                />
              ) : (
                <div style={{ height: businessInfo.signatureSize ? \`\${businessInfo.signatureSize}px\` : '96px' }}></div>
              )}
            </div>
          </div>`
  );

  // 2. Items body (hide price/amount)
  // We need to replace the `td` for price and amount.
  // We'll use a regex to find the two `td`s at the end of the Reorder.Item and wrap them in `{!isHandoverMode && ( ... )}`
  
  // For `td` with `border-black` (Bold, Corporate)
  content = content.replace(
    /<td className="border border-black p-2 text-right">\{formatCurrency\(item\.price\)\}<\/td>\s*<td className="border border-black p-2 text-right">\{formatCurrency\(amount\)\}<\/td>/g,
    `{!isHandoverMode && (
                        <>
                          <td className="border border-black p-2 text-right">{formatCurrency(item.price)}</td>
                          <td className="border border-black p-2 text-right">{formatCurrency(amount)}</td>
                        </>
                      )}`
  );
  
  // For `td` with `p-3` (Creative, Minimalist, Modern)
  content = content.replace(
    /<td className="p-3 text-right">\{formatCurrency\(item\.price\)\}<\/td>\s*<td className="p-3 text-right font-medium">\{formatCurrency\(amount\)\}<\/td>/g,
    `{!isHandoverMode && (
                        <>
                          <td className="p-3 text-right">{formatCurrency(item.price)}</td>
                          <td className="p-3 text-right font-medium">{formatCurrency(amount)}</td>
                        </>
                      )}`
  );

  // 3. Text-only items
  // We need to insert the `if (item.isTextOnly)` block right after `const amount = item.quantity * item.price;`
  
  const textOnlyBlockBorder = `
                  if (item.isTextOnly) {
                    return (
                      <Reorder.Item 
                        key={item.id} 
                        value={item} 
                        as="tr" 
                        className="group/row cursor-default bg-white"
                      >
                        <td colSpan={isHandoverMode ? (businessInfo.showItemImages ? 5 : 4) : (businessInfo.showItemImages ? 7 : 6)} className="border border-black p-2 relative">
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-0 group-hover/row:opacity-100 transition-opacity print:hidden cursor-grab active:cursor-grabbing p-1 bg-blue-50 rounded border border-blue-200 -left-6">
                            <GripVertical size={14} className="text-blue-500" />
                          </div>
                          <div className="font-bold whitespace-pre-wrap">{item.name}</div>
                          {item.note && <div className="italic text-sm whitespace-pre-wrap mt-1">{item.note}</div>}
                        </td>
                      </Reorder.Item>
                    );
                  }
`;

  const textOnlyBlockNoBorder = `
                  if (item.isTextOnly) {
                    return (
                      <Reorder.Item 
                        key={item.id} 
                        value={item} 
                        as="tr" 
                        className="group/row cursor-default bg-white border-b border-gray-100"
                      >
                        <td colSpan={isHandoverMode ? (businessInfo.showItemImages ? 5 : 4) : (businessInfo.showItemImages ? 7 : 6)} className="p-3 relative">
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-0 group-hover/row:opacity-100 transition-opacity print:hidden cursor-grab active:cursor-grabbing p-1 bg-blue-50 rounded border border-blue-200 -left-6">
                            <GripVertical size={14} className="text-blue-500" />
                          </div>
                          <div className="font-bold whitespace-pre-wrap">{item.name}</div>
                          {item.note && <div className="italic text-sm whitespace-pre-wrap mt-1">{item.note}</div>}
                        </td>
                      </Reorder.Item>
                    );
                  }
`;

  if (filename === 'BoldTemplate.tsx' || filename === 'CorporateTemplate.tsx') {
    content = content.replace(/const amount = item\.quantity \* item\.price;/g, `const amount = item.quantity * item.price;${textOnlyBlockBorder}`);
  } else {
    content = content.replace(/const amount = item\.quantity \* item\.price;/g, `const amount = item.quantity * item.price;${textOnlyBlockNoBorder}`);
  }

  fs.writeFileSync(filePath, content);
};

['BoldTemplate.tsx', 'CorporateTemplate.tsx', 'CreativeTemplate.tsx', 'MinimalistTemplate.tsx', 'ModernTemplate.tsx'].forEach(replaceInFile);

console.log('Done');

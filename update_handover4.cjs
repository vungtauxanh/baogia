const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/templates');

const replaceInFile = (filename) => {
  const filePath = path.join(dir, filename);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace the entire signature case
  const signatureRegex = /case 'signature':[\s\S]*?rowId, colIdx\n\s*\);/g;
  
  const newSignature = `case 'signature':
        return componentWrapper(
          <div key="signature" className={\`flex \${isHandoverMode ? 'justify-between' : 'justify-end'} w-full mt-8\`}>
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
          </div>,
          rowId, colIdx
        );`;

  content = content.replace(signatureRegex, newSignature);

  fs.writeFileSync(filePath, content);
};

['BoldTemplate.tsx', 'CorporateTemplate.tsx', 'CreativeTemplate.tsx', 'MinimalistTemplate.tsx', 'ModernTemplate.tsx'].forEach(replaceInFile);

console.log('Done');

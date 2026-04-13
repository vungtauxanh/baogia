const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/App.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// We need to change the layout to 3 columns.
// Currently it's:
// <div className="flex flex-col lg:flex-row h-screen bg-gray-100 font-sans">
//   <div className="w-full lg:w-[450px] xl:w-[500px] flex-shrink-0 border-r bg-white flex flex-col print:hidden h-full">
//     ... header ...
//     <div className="flex-1 overflow-y-auto p-4 lg:p-6 custom-scrollbar">
//       {showSettings ? ( ... settings ... ) : ( ... items ... )}
//     </div>
//   </div>
//   <div className="flex-1 overflow-y-auto bg-gray-200 ...">
//     ... preview ...
//   </div>
// </div>

// We will split the first column into two columns.
// Column 1: Settings (w-[350px])
// Column 2: Items (w-[400px])

// Let's find the start of the first column
const col1Start = content.indexOf('<div className="w-full lg:w-[450px] xl:w-[500px] flex-shrink-0 border-r bg-white flex flex-col print:hidden h-full">');
const previewStart = content.indexOf('{/* Preview Area (A4 Document) */}');

if (col1Start !== -1 && previewStart !== -1) {
  const originalCol1 = content.substring(col1Start, previewStart);
  
  // Extract the header
  const headerMatch = originalCol1.match(/<div className="p-4 border-b bg-blue-600[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/);
  const header = headerMatch ? headerMatch[0] : '';
  
  // Extract settings content
  const settingsMatch = originalCol1.match(/{showSettings \? \([\s\S]*?(?=\)\s*:\s*\()/);
  let settingsContent = settingsMatch ? settingsMatch[0].replace('{showSettings ? (', '').trim() : '';
  
  // Extract items content
  const itemsMatch = originalCol1.match(/\)\s*:\s*\([\s\S]*?(?=\)\s*}\s*<\/div>\s*<\/div>)/);
  let itemsContent = itemsMatch ? itemsMatch[0].replace(/^\)\s*:\s*\(/, '').trim() : '';
  
  // Build new layout
  const newLayout = `
      {/* Column 1: Cấu hình */}
      <div className="w-[350px] flex-shrink-0 border-r bg-white flex flex-col print:hidden h-full z-20 shadow-lg">
        ${header.replace('w-full lg:w-[450px] xl:w-[500px]', 'w-full')}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          ${settingsContent}
        </div>
      </div>

      {/* Column 2: Hàng hóa / Dịch vụ */}
      <div className="w-[400px] flex-shrink-0 border-r bg-gray-50 flex flex-col print:hidden h-full z-10 shadow-md">
        <div className="p-4 border-b bg-white flex justify-between items-center shrink-0">
          <h2 className="font-bold text-gray-700">Hàng hóa / Dịch vụ</h2>
          <button onClick={addItem} className="text-blue-600 hover:bg-blue-50 p-1.5 rounded transition-colors">
            <Plus size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          ${itemsContent}
        </div>
      </div>
  `;
  
  content = content.substring(0, col1Start) + newLayout + '\n      ' + content.substring(previewStart);
  
  // Remove showSettings state and toggle button since we don't need it anymore
  content = content.replace(/const \[showSettings, setShowSettings\] = useState\(false\);\n/, '');
  
  // Remove the settings toggle button from header
  const settingsBtnRegex = /<div className="w-px h-8 bg-blue-400 mx-1"><\/div>\s*<button\s*onClick={\(\) => setShowSettings\(!showSettings\)}[\s\S]*?<\/button>/;
  content = content.replace(settingsBtnRegex, '');
  
  fs.writeFileSync(filePath, content);
  console.log('Layout updated');
} else {
  console.log('Could not find layout markers');
}

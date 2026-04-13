const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/templates');
const baseContent = fs.readFileSync(path.join(dir, 'ModernTemplate.tsx'), 'utf8');

const templates = [
  { name: 'StartupTemplate', color: 'purple', bg: 'bg-purple-600', text: 'text-purple-600', border: 'border-purple-200' },
  { name: 'VintageTemplate', color: 'amber', bg: 'bg-amber-800', text: 'text-amber-800', border: 'border-amber-200' },
  { name: 'NeonTemplate', color: 'pink', bg: 'bg-pink-500', text: 'text-pink-500', border: 'border-pink-200' },
  { name: 'OceanTemplate', color: 'cyan', bg: 'bg-cyan-600', text: 'text-cyan-600', border: 'border-cyan-200' },
  { name: 'MonochromeTemplate', color: 'gray', bg: 'bg-gray-900', text: 'text-gray-900', border: 'border-gray-300' }
];

templates.forEach(t => {
  let content = baseContent.replace(/ModernTemplate/g, t.name);
  
  // Replace colors
  content = content.replace(/bg-blue-600/g, t.bg);
  content = content.replace(/text-blue-600/g, t.text);
  content = content.replace(/text-blue-700/g, t.text);
  content = content.replace(/border-blue-200/g, t.border);
  content = content.replace(/bg-blue-50/g, `bg-${t.color}-50`);
  content = content.replace(/text-blue-500/g, `text-${t.color}-500`);

  // Add some specific styling per template
  if (t.name === 'StartupTemplate') {
    content = content.replace(/font-black text-4xl/g, 'font-extrabold text-4xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500');
    content = content.replace(/rounded-lg/g, 'rounded-2xl');
    content = content.replace(/rounded-tl-lg/g, 'rounded-tl-2xl');
    content = content.replace(/rounded-tr-lg/g, 'rounded-tr-2xl');
  } else if (t.name === 'VintageTemplate') {
    content = content.replace(/font-black text-4xl/g, 'font-serif text-4xl text-amber-900 tracking-widest border-b-2 border-amber-900 pb-2 inline-block');
    content = content.replace(/bg-gray-50/g, 'bg-[#fdfbf7]');
    content = content.replace(/rounded-lg/g, 'rounded-none');
    content = content.replace(/rounded-tl-lg/g, 'rounded-none');
    content = content.replace(/rounded-tr-lg/g, 'rounded-none');
  } else if (t.name === 'NeonTemplate') {
    content = content.replace(/font-black text-4xl/g, 'font-black text-5xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]');
    content = content.replace(/bg-gray-50/g, 'bg-gray-900 text-white');
    content = content.replace(/text-gray-600/g, 'text-gray-300');
    content = content.replace(/text-gray-800/g, 'text-gray-100');
    content = content.replace(/text-gray-500/g, 'text-gray-400');
    content = content.replace(/bg-white/g, 'bg-gray-800');
    content = content.replace(/border-gray-100/g, 'border-gray-700');
    content = content.replace(/border-gray-200/g, 'border-gray-700');
  } else if (t.name === 'OceanTemplate') {
    content = content.replace(/font-black text-4xl/g, 'font-light text-4xl text-cyan-700 tracking-widest');
    content = content.replace(/bg-gray-50/g, 'bg-cyan-50');
    content = content.replace(/rounded-lg/g, 'rounded-3xl');
    content = content.replace(/rounded-tl-lg/g, 'rounded-tl-3xl');
    content = content.replace(/rounded-tr-lg/g, 'rounded-tr-3xl');
  } else if (t.name === 'MonochromeTemplate') {
    content = content.replace(/font-black text-4xl/g, 'font-mono text-4xl text-black uppercase border-4 border-black p-2 inline-block');
    content = content.replace(/bg-gray-50/g, 'bg-white border-2 border-black');
    content = content.replace(/rounded-lg/g, 'rounded-none');
    content = content.replace(/rounded-tl-lg/g, 'rounded-none');
    content = content.replace(/rounded-tr-lg/g, 'rounded-none');
    content = content.replace(/border-gray-100/g, 'border-black');
    content = content.replace(/border-gray-200/g, 'border-black');
  }

  fs.writeFileSync(path.join(dir, `${t.name}.tsx`), content);
});

console.log('Done');

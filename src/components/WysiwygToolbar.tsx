import React, { useEffect, useState, useRef } from 'react';
import { Bold, Italic, Underline, Palette, Type } from 'lucide-react';

export const WysiwygToolbar = () => {
  const [position, setPosition] = useState<{ x: number, y: number } | null>(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const toolbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0 && !selection.isCollapsed) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        
        // Check if selection is inside the print area
        const printArea = document.getElementById('print-area');
        if (printArea && printArea.contains(selection.anchorNode)) {
          setPosition({
            x: rect.left + rect.width / 2,
            y: rect.top - 40 // Position above the selection
          });
        } else {
          setPosition(null);
          setShowColorPicker(false);
        }
      } else {
        // Don't hide if clicking inside the toolbar itself
        setTimeout(() => {
          if (!toolbarRef.current?.contains(document.activeElement)) {
            setPosition(null);
            setShowColorPicker(false);
          }
        }, 100);
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => document.removeEventListener('selectionchange', handleSelectionChange);
  }, []);

  const execCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
  };

  if (!position) return null;

  return (
    <div 
      ref={toolbarRef}
      className="fixed z-[200] bg-gray-800 text-white rounded-lg shadow-xl flex items-center p-1 gap-1 transform -translate-x-1/2 print:hidden"
      style={{ left: position.x, top: position.y }}
      onMouseDown={(e) => e.preventDefault()} // Prevent losing selection
    >
      <button onClick={() => execCommand('bold')} className="p-1.5 hover:bg-gray-700 rounded"><Bold size={14} /></button>
      <button onClick={() => execCommand('italic')} className="p-1.5 hover:bg-gray-700 rounded"><Italic size={14} /></button>
      <button onClick={() => execCommand('underline')} className="p-1.5 hover:bg-gray-700 rounded"><Underline size={14} /></button>
      
      <div className="w-px h-4 bg-gray-600 mx-1"></div>
      
      <div className="relative flex items-center">
        <label className="cursor-pointer p-1.5 hover:bg-gray-700 rounded flex items-center gap-1">
          <Palette size={14} />
          <input 
            type="color" 
            className="absolute opacity-0 w-0 h-0"
            onChange={(e) => execCommand('foreColor', e.target.value)}
          />
        </label>
      </div>

      <div className="w-px h-4 bg-gray-600 mx-1"></div>
      
      <select 
        className="bg-transparent text-xs outline-none cursor-pointer p-1"
        onChange={(e) => execCommand('fontSize', e.target.value)}
        defaultValue="3"
      >
        <option value="1" className="text-black">Nhỏ nhất</option>
        <option value="2" className="text-black">Nhỏ</option>
        <option value="3" className="text-black">Vừa</option>
        <option value="4" className="text-black">Lớn</option>
        <option value="5" className="text-black">Rất lớn</option>
        <option value="6" className="text-black">Khổng lồ</option>
      </select>
    </div>
  );
};

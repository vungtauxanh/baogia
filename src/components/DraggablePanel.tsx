import React, { useState, useRef, useEffect } from 'react';
import { X, GripHorizontal } from 'lucide-react';

interface DraggablePanelProps {
  title: string;
  children: React.ReactNode;
  defaultPosition?: { x: number; y: number };
  onClose?: () => void;
}

export const DraggablePanel: React.FC<DraggablePanelProps> = ({ title, children, defaultPosition, onClose }) => {
  const [position, setPosition] = useState(defaultPosition || { x: 20, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - offset.current.x,
          y: e.clientY - offset.current.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      className="fixed bg-white border border-gray-200 rounded-xl shadow-2xl z-[100] flex flex-col overflow-hidden print:hidden"
      style={{ left: position.x, top: position.y, width: 280 }}
    >
      <div 
        className="bg-gray-100 p-3 border-b flex justify-between items-center cursor-move select-none"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2 text-gray-500">
          <GripHorizontal size={16} />
          <span className="font-bold text-xs text-gray-700 uppercase">{title}</span>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 transition-colors">
            <X size={16} />
          </button>
        )}
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

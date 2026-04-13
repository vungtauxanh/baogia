import React from 'react';
import { TemplateProps, Item } from '../../types';
import { Reorder } from 'motion/react';
import { GripVertical } from 'lucide-react';

const formatCurrency = (amount: number) => {
  if (!amount) return '-';
  return new Intl.NumberFormat('vi-VN').format(amount);
};

import { MoveVertical } from 'lucide-react';

export const TechTemplate: React.FC<TemplateProps> = ({ data, onReorder, onRowSpacingChange, onSectionOrderChange }) => {
  const { businessInfo, customerName, items, total, rowSpacing, printOrientation, margins, sectionOrder, sectionSpacing, quoteDate, isHandoverMode } = data;
  
  const isLandscape = printOrientation === 'landscape';
  const isFix = printOrientation === 'fix';

  const logoAlignClass = 
    businessInfo.logoPosition === 'center' ? 'mx-auto' : 
    businessInfo.logoPosition === 'right' ? 'ml-auto' : 'mr-auto';

  const headerAlignClass = 
    businessInfo.logoPosition === 'center' ? 'text-center' : 
    businessInfo.logoPosition === 'right' ? 'text-right' : 
    businessInfo.logoPosition === 'inline-left' ? 'text-left' : 'text-left';

  const containerStyle = isLandscape 
    ? "w-[297mm] min-h-[210mm]" 
    : isFix 
      ? "w-[210mm] h-[297mm] overflow-hidden" 
      : "w-[210mm] min-h-[297mm]";

  const currentSectionOrder = sectionOrder || ['business', 'title', 'customer', 'items', 'footer'];

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'business':
        return (
          <div key="business" className="flex justify-between items-start mb-12 border-b border-cyan-900/50 pb-8 relative group/section">
            <div className="absolute -left-8 top-0 opacity-0 group-hover/section:opacity-100 transition-opacity print:hidden cursor-grab active:cursor-grabbing p-1 bg-slate-800 rounded border border-cyan-900">
              <MoveVertical size={16} className="text-cyan-500" />
            </div>
            <div className={`flex-1 ${headerAlignClass}`}>
              {businessInfo.logoPosition === 'inline-left' ? (
                <div className="flex items-center gap-4">
                  {businessInfo.logo && (
                    <img 
                      src={businessInfo.logo} 
                      alt="Logo" 
                      className="object-contain brightness-125 contrast-125" 
                      style={{ height: businessInfo.logoSize ? `${businessInfo.logoSize}px` : '64px' }}
                    />
                  )}
                  <div>
                    <h1 className="font-black text-2xl text-white uppercase tracking-tighter mb-1">{businessInfo.name}</h1>
                    <p className="text-cyan-600 text-xs uppercase tracking-widest">{businessInfo.address}</p>
                  </div>
                </div>
              ) : (
                <>
                  {businessInfo.logo && (
                    <img 
                      src={businessInfo.logo} 
                      alt="Logo" 
                      className={`mb-4 object-contain brightness-125 contrast-125 ${logoAlignClass}`} 
                      style={{ height: businessInfo.logoSize ? `${businessInfo.logoSize}px` : '64px' }}
                    />
                  )}
                  <h1 className="font-black text-2xl text-white uppercase tracking-tighter mb-1">{businessInfo.name}</h1>
                  <p className="text-cyan-600 text-xs uppercase tracking-widest">{businessInfo.address}</p>
                </>
              )}
              <div className={`flex gap-4 mt-3 text-[10px] text-cyan-700 font-bold ${businessInfo.logoPosition === 'center' ? 'justify-center' : businessInfo.logoPosition === 'right' ? 'justify-end' : ''}`}>
                <span>ID: {businessInfo.taxCode}</span>
                <span>TEL: {businessInfo.phone}</span>
              </div>
            </div>
            <div className="text-right ml-4">
              <p className="text-cyan-800 text-[10px]">TIMESTAMP: {quoteDate}</p>
            </div>
          </div>
        );
      case 'title':
        return (
          <div key="title" className="mb-12 relative group/section text-center">
            <div className="absolute -left-8 top-0 opacity-0 group-hover/section:opacity-100 transition-opacity print:hidden cursor-grab active:cursor-grabbing p-1 bg-slate-800 rounded border border-cyan-900">
              <MoveVertical size={16} className="text-cyan-500" />
            </div>
            <div className="inline-block border border-cyan-500 px-6 py-2">
              <h2 className="font-black text-3xl text-cyan-400 uppercase tracking-tighter">QUOTATION_v1.0</h2>
            </div>
          </div>
        );
      case 'customer':
        return (
          <div key="customer" className="grid grid-cols-2 gap-12 mb-12 relative group/section">
            <div className="absolute -left-8 top-0 opacity-0 group-hover/section:opacity-100 transition-opacity print:hidden cursor-grab active:cursor-grabbing p-1 bg-slate-800 rounded border border-cyan-900">
              <MoveVertical size={16} className="text-cyan-500" />
            </div>
            <div className="border-l-2 border-cyan-500 pl-4">
              <p className="text-[10px] text-cyan-800 uppercase tracking-widest mb-2 font-bold">// DESTINATION_CLIENT</p>
              <p className="font-black text-xl text-white uppercase tracking-tight">{customerName}</p>
              {data.customerAddress && <p className="text-cyan-600 mt-1 text-xs">{data.customerAddress}</p>}
            </div>
            <div className="text-right border-r-2 border-cyan-900 pr-4">
              <p className="text-[10px] text-cyan-800 uppercase tracking-widest mb-2 font-bold">// SYSTEM_INFO</p>
              <p className="text-cyan-500">STATUS: ACTIVE</p>
              <p className="text-cyan-500">PRIORITY: HIGH</p>
            </div>
          </div>
        );
      case 'items':
        return (
          <div key="items" className="mb-8 relative group/section">
            <div className="absolute -left-8 top-0 opacity-0 group-hover/section:opacity-100 transition-opacity print:hidden cursor-grab active:cursor-grabbing p-1 bg-slate-800 rounded border border-cyan-900">
              <MoveVertical size={16} className="text-cyan-500" />
            </div>
            <div className="border border-cyan-900 rounded-sm overflow-hidden mb-8">
              <table className="w-full">
                <thead>
                  <tr className="bg-cyan-950 text-cyan-500 text-[10px] uppercase font-bold">
                    <th className="py-2 px-4 text-center border-r border-cyan-900 w-12">ID</th>
                    {businessInfo.showItemImages && <th className="py-2 px-4 text-center border-r border-cyan-900 w-20">IMG</th>}
                    <th className="py-2 px-4 text-left border-r border-cyan-900">MODULE_DESCRIPTION</th>
                    <th className="py-2 px-4 text-center border-r border-cyan-900 w-16">QTY</th>
                    <th className="py-2 px-4 text-right border-r border-cyan-900 w-32">UNIT_PRICE</th>
                    <th className="py-2 px-4 text-right w-32">SUB_TOTAL</th>
                  </tr>
                </thead>
                <Reorder.Group as="tbody" axis="y" values={items} onReorder={(newItems) => onReorder?.(newItems)} className="divide-y divide-cyan-950">
                  {items.map((item, index) => {
                    const amount = item.quantity * item.price;
                    return (
                      <Reorder.Item 
                        key={item.id} 
                        value={item} 
                        as="tr" 
                        style={{ height: rowSpacing ? `${40 + rowSpacing}px` : '40px' }}
                        className="hover:bg-cyan-950/30 transition-colors group/row cursor-default bg-[#0f172a]"
                      >
                        <td className="py-3 px-4 text-center text-cyan-800 border-r border-cyan-900 relative">
                          {index.toString().padStart(2, '0')}
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-0 group-hover/row:opacity-100 transition-opacity print:hidden cursor-grab active:cursor-grabbing p-1 bg-cyan-900/50 rounded border border-cyan-500 -left-4">
                            <GripVertical size={14} className="text-cyan-400" />
                          </div>
                        </td>
                        {businessInfo.showItemImages && (
                          <td className="py-3 px-4 text-center border-r border-cyan-900">
                            {item.image ? (
                              <img src={item.image} alt={item.name} className="w-10 h-10 object-cover border border-cyan-900 mx-auto" />
                            ) : (
                              <div className="w-10 h-10 border border-cyan-900 mx-auto flex items-center justify-center text-[8px] text-cyan-900">NULL</div>
                            )}
                          </td>
                        )}
                        <td className="py-3 px-4 border-r border-cyan-900">
                          <p className="font-bold text-cyan-100 whitespace-pre-wrap uppercase">{item.name}</p>
                          {item.note && <p className="text-[10px] text-cyan-700 mt-1 italic">{item.note}</p>}
                        </td>
                        <td className="py-3 px-4 text-center border-r border-cyan-900 text-cyan-500">
                          {item.quantity} {item.unit}
                        </td>
                        {!isHandoverMode && (
                        <>
                          <td className="py-3 px-4 text-right border-r border-cyan-900 text-cyan-500">{formatCurrency(item.price)}</td>
                        <td className="py-3 px-4 text-right font-bold text-cyan-400">{formatCurrency(amount)}</td>
                        </>
                      )}
                      </Reorder.Item>
                    );
                  })}
                </Reorder.Group>
              </table>
            </div>
            <div className="flex justify-end">
              <div className="w-80 border border-cyan-900 p-6 bg-cyan-950/20">
                <div className="flex justify-between mb-2">
                  <span className="text-cyan-700 uppercase tracking-widest text-[10px]">SUB_TOTAL:</span>
                  <span className="font-bold">{formatCurrency(data.subtotal)}</span>
                </div>
                <div className="flex justify-between mb-4 pb-4 border-b border-cyan-900/50">
                  <span className="text-cyan-700 uppercase tracking-widest text-[10px]">TAX_VAT {data.isVatIncluded ? '' : `(${data.vatRate}%):`}</span>
                  <span className="font-bold">{data.isVatIncluded ? 'INCLUDED' : formatCurrency(data.subtotal * (data.vatRate / 100))}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-cyan-500 uppercase tracking-widest font-black">GRAND_TOTAL:</span>
                  <span className="text-2xl font-black text-white">{formatCurrency(data.total)}</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'footer':
        return (
          <div key="footer" className="grid grid-cols-2 gap-12 relative group/section">
            <div className="absolute -left-8 top-0 opacity-0 group-hover/section:opacity-100 transition-opacity print:hidden cursor-grab active:cursor-grabbing p-1 bg-slate-800 rounded border border-cyan-900">
              <MoveVertical size={16} className="text-cyan-500" />
            </div>
            <div className="text-[10px] text-cyan-700">
              <p className="font-bold text-cyan-500 mb-2 uppercase tracking-widest">// SYSTEM_NOTES</p>
              {businessInfo.showPaymentInfo && (
                <div className="mb-4">
                  <p className="text-cyan-600 font-bold mb-1">PAYMENT_INSTRUCTIONS:</p>
                  <div className="whitespace-pre-wrap leading-tight opacity-70">{businessInfo.paymentInfo}</div>
                </div>
              )}
              {businessInfo.showNotes && (
                <div>
                  <p className="text-cyan-600 font-bold mb-1">TERMS_AND_CONDITIONS:</p>
                  <div className="whitespace-pre-wrap leading-tight opacity-70">{businessInfo.notes}</div>
                </div>
              )}
            </div>
            <div className="text-center">
              <p className="text-[10px] text-cyan-700 uppercase tracking-widest mb-8 font-bold">// AUTHORIZED_SIGNATURE</p>
              {businessInfo.signature ? (
                <img 
                  src={businessInfo.signature} 
                  alt="Signature" 
                  className="mx-auto object-contain mb-2 brightness-150 contrast-150" 
                  style={{ height: businessInfo.signatureSize ? `${businessInfo.signatureSize}px` : '80px' }}
                />
              ) : (
                <div className="mb-2" style={{ height: businessInfo.signatureSize ? `${businessInfo.signatureSize}px` : '80px' }}></div>
              )}
              <div className="w-48 h-px bg-cyan-900 mx-auto mb-2"></div>
              <p className="font-black text-white uppercase tracking-tighter">{businessInfo.name}</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const marginStyle = margins ? {
    paddingTop: `${margins.top}mm`,
    paddingRight: `${margins.right}mm`,
    paddingBottom: `${margins.bottom}mm`,
    paddingLeft: `${margins.left}mm`,
  } : { padding: '15mm' };

  return (
    <div 
      className={`bg-[#0f172a] shadow-2xl ${containerStyle} font-mono text-[13px] leading-relaxed print:shadow-none print:w-full print:min-h-0 print:p-0 text-cyan-400 relative group/template overflow-hidden`}
      style={marginStyle}
    >
      {/* Interactive controls overlay (hidden when printing) */}
      <Reorder.Group axis="y" values={currentSectionOrder} onReorder={(newOrder) => onSectionOrderChange?.(newOrder)}>
        {currentSectionOrder.map((sectionId) => (
          <Reorder.Item 
            key={sectionId} 
            value={sectionId} 
            style={{ marginBottom: sectionSpacing ? `${sectionSpacing}px` : '24px' }}
            className="bg-white/0"
          >
            {renderSection(sectionId)}
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
};

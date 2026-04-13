import React from 'react';
import { TemplateProps, Item } from '../../types';
import { Reorder } from 'motion/react';
import { GripVertical } from 'lucide-react';

const formatCurrency = (amount: number) => {
  if (!amount) return '-';
  return new Intl.NumberFormat('vi-VN').format(amount);
};

import { MoveVertical } from 'lucide-react';

export const PremiumTemplate: React.FC<TemplateProps> = ({ data, onReorder, onRowSpacingChange, onSectionOrderChange }) => {
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
          <div key="business" className="flex justify-between items-start mb-16 border-b border-amber-900/30 pb-10 relative group/section">
            <div className="absolute -left-8 top-0 opacity-0 group-hover/section:opacity-100 transition-opacity print:hidden cursor-grab active:cursor-grabbing p-1 bg-zinc-900 rounded border border-amber-900 shadow-sm">
              <MoveVertical size={16} className="text-amber-500" />
            </div>
            <div className={`flex-1 ${headerAlignClass}`}>
              {businessInfo.logoPosition === 'inline-left' ? (
                <div className="flex items-center gap-6">
                  {businessInfo.logo && (
                    <img 
                      src={businessInfo.logo} 
                      alt="Logo" 
                      className="object-contain brightness-110 contrast-125" 
                      style={{ height: businessInfo.logoSize ? `${businessInfo.logoSize}px` : '80px' }}
                    />
                  )}
                  <div>
                    <h1 className="font-black text-4xl text-white uppercase tracking-tighter mb-1">{businessInfo.name}</h1>
                    <p className="text-amber-500 text-xs uppercase tracking-[0.3em] font-bold">{businessInfo.address}</p>
                  </div>
                </div>
              ) : (
                <>
                  {businessInfo.logo && (
                    <img 
                      src={businessInfo.logo} 
                      alt="Logo" 
                      className={`mb-6 object-contain brightness-110 contrast-125 ${logoAlignClass}`} 
                      style={{ height: businessInfo.logoSize ? `${businessInfo.logoSize}px` : '80px' }}
                    />
                  )}
                  <h1 className="font-black text-4xl text-white uppercase tracking-tighter mb-1">{businessInfo.name}</h1>
                  <p className="text-amber-500 text-xs uppercase tracking-[0.3em] font-bold">{businessInfo.address}</p>
                </>
              )}
              <div className={`flex gap-6 mt-4 text-[10px] text-gray-500 font-bold ${businessInfo.logoPosition === 'center' ? 'justify-center' : businessInfo.logoPosition === 'right' ? 'justify-end' : ''}`}>
                <span>MST: {businessInfo.taxCode}</span>
                <span>•</span>
                <span>ĐT: {businessInfo.phone}</span>
              </div>
            </div>
            <div className="text-right ml-4">
              <p className="text-amber-500 font-bold tracking-widest uppercase text-xs">Premium Service</p>
            </div>
          </div>
        );
      case 'title':
        return (
          <div key="title" className="mb-16 relative group/section text-center">
            <div className="absolute -left-8 top-0 opacity-0 group-hover/section:opacity-100 transition-opacity print:hidden cursor-grab active:cursor-grabbing p-1 bg-zinc-900 rounded border border-amber-900 shadow-sm">
              <MoveVertical size={16} className="text-amber-500" />
            </div>
            <h2 className="font-black text-6xl text-white uppercase tracking-tighter mb-2 opacity-20">QUOTATION</h2>
          </div>
        );
      case 'customer':
        return (
          <div key="customer" className="flex justify-between items-end mb-16 relative group/section">
            <div className="absolute -left-8 top-0 opacity-0 group-hover/section:opacity-100 transition-opacity print:hidden cursor-grab active:cursor-grabbing p-1 bg-zinc-900 rounded border border-amber-900 shadow-sm">
              <MoveVertical size={16} className="text-amber-500" />
            </div>
            <div className="border-l-4 border-amber-500 pl-8">
              <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-2 font-bold">Prepared for</p>
              <p className="font-black text-3xl text-white uppercase tracking-tight">{customerName}</p>
              {data.customerAddress && <p className="text-gray-400 mt-2 text-sm italic">{data.customerAddress}</p>}
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-1 font-bold">Issue Date</p>
              <p className="text-white font-bold text-lg">{quoteDate}</p>
              <p className="text-amber-500 text-[10px] font-bold mt-1 uppercase tracking-widest">REF: Q-{Date.now().toString().slice(-6)}</p>
            </div>
          </div>
        );
      case 'items':
        return (
          <div key="items" className="mb-8 relative group/section">
            <div className="absolute -left-8 top-0 opacity-0 group-hover/section:opacity-100 transition-opacity print:hidden cursor-grab active:cursor-grabbing p-1 bg-zinc-900 rounded border border-amber-900 shadow-sm">
              <MoveVertical size={16} className="text-amber-500" />
            </div>
            <div className="bg-zinc-900/50 rounded-2xl border border-amber-900/20 overflow-hidden mb-12">
              <table className="w-full">
                <thead>
                  <tr className="bg-zinc-900 text-amber-500 text-[10px] uppercase tracking-widest font-black">
                    <th className="py-6 px-6 text-center w-16">#</th>
                    {businessInfo.showItemImages && <th className="py-6 px-6 text-center w-24">Item</th>}
                    <th className="py-6 px-6 text-left">Description</th>
                    <th className="py-6 px-6 text-center w-20">Qty</th>
                    <th className="py-6 px-6 text-right w-32">Price</th>
                    <th className="py-6 px-6 text-right w-32">Total</th>
                  </tr>
                </thead>
                <Reorder.Group as="tbody" axis="y" values={items} onReorder={(newItems) => onReorder?.(newItems)} className="divide-y divide-amber-900/10">
                  {items.map((item, index) => {
                    const amount = item.quantity * item.price;
                    return (
                      <Reorder.Item 
                        key={item.id} 
                        value={item} 
                        as="tr" 
                        style={{ height: rowSpacing ? `${40 + rowSpacing}px` : '40px' }}
                        className="hover:bg-amber-500/5 transition-colors group/row cursor-default bg-transparent"
                      >
                        <td className="py-6 px-6 text-center text-gray-600 font-bold relative">
                          {index + 1}
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-0 group-hover/row:opacity-100 transition-opacity print:hidden cursor-grab active:cursor-grabbing p-1 bg-amber-900/50 rounded border border-amber-500 -left-4">
                            <GripVertical size={14} className="text-amber-500" />
                          </div>
                        </td>
                        {businessInfo.showItemImages && (
                          <td className="py-6 px-6 text-center">
                            {item.image ? (
                              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl border border-amber-900/30 mx-auto shadow-lg" />
                            ) : (
                              <div className="w-16 h-16 bg-zinc-800 rounded-xl mx-auto flex items-center justify-center text-[8px] text-gray-700 font-bold uppercase tracking-widest">No Img</div>
                            )}
                          </td>
                        )}
                        <td className="py-6 px-6">
                          <p className="font-black text-white whitespace-pre-wrap uppercase tracking-tight">{item.name}</p>
                          {item.note && <p className="text-[10px] text-gray-500 mt-2 italic font-medium">{item.note}</p>}
                        </td>
                        <td className="py-6 px-6 text-center text-gray-400 font-bold">
                          {item.quantity} {item.unit}
                        </td>
                        {!isHandoverMode && (
                        <>
                          <td className="py-6 px-6 text-right text-gray-400 font-medium">{formatCurrency(item.price)}</td>
                        <td className="py-6 px-6 text-right font-black text-white">{formatCurrency(amount)}</td>
                        </>
                      )}
                      </Reorder.Item>
                    );
                  })}
                </Reorder.Group>
              </table>
            </div>
            <div className="flex justify-end">
              <div className="w-96 bg-zinc-900 p-10 rounded-3xl border border-amber-900/30 shadow-2xl">
                <div className="flex justify-between mb-4 opacity-50 text-[10px] font-bold uppercase tracking-[0.2em]">
                  <span>Sub-total:</span>
                  <span>{formatCurrency(data.subtotal)}</span>
                </div>
                <div className="flex justify-between mb-8 pb-8 border-b border-amber-900/20 opacity-50 text-[10px] font-bold uppercase tracking-[0.2em]">
                  <span>Tax VAT {data.isVatIncluded ? '' : `(${data.vatRate}%):`}</span>
                  <span>{data.isVatIncluded ? 'INCLUDED' : formatCurrency(data.subtotal * (data.vatRate / 100))}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-amber-500 uppercase tracking-[0.3em] font-black text-xs">Grand Total:</span>
                  <span className="text-3xl font-black text-white tracking-tighter">{formatCurrency(data.total)}</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'footer':
        return (
          <div key="footer" className="grid grid-cols-2 gap-16 relative group/section">
            <div className="absolute -left-8 top-0 opacity-0 group-hover/section:opacity-100 transition-opacity print:hidden cursor-grab active:cursor-grabbing p-1 bg-zinc-900 rounded border border-amber-900 shadow-sm">
              <MoveVertical size={16} className="text-amber-500" />
            </div>
            <div className="text-[10px] text-gray-500">
              <p className="font-black text-amber-500 mb-4 uppercase tracking-[0.2em]">Notes & Terms</p>
              {businessInfo.showPaymentInfo && (
                <div className="mb-6 bg-zinc-900/30 p-6 rounded-2xl border border-amber-900/10">
                  <div className="whitespace-pre-wrap leading-relaxed font-medium">{businessInfo.paymentInfo}</div>
                </div>
              )}
              {businessInfo.showNotes && (
                <div className="bg-zinc-900/30 p-6 rounded-2xl border border-amber-900/10">
                  <div className="whitespace-pre-wrap leading-relaxed font-medium">{businessInfo.notes}</div>
                </div>
              )}
            </div>
            <div className="text-center">
              <p className="font-black text-white uppercase tracking-[0.3em] text-[10px] mb-12">Authorized Signature</p>
              {businessInfo.signature ? (
                <img 
                  src={businessInfo.signature} 
                  alt="Signature" 
                  className="mx-auto object-contain mb-4 brightness-125 contrast-125" 
                  style={{ height: businessInfo.signatureSize ? `${businessInfo.signatureSize}px` : '80px' }}
                />
              ) : (
                <div className="mb-4" style={{ height: businessInfo.signatureSize ? `${businessInfo.signatureSize}px` : '80px' }}></div>
              )}
              <div className="w-56 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-4"></div>
              <p className="font-black text-white uppercase tracking-widest text-xs">{businessInfo.name}</p>
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
  } : { padding: '20mm' };

  return (
    <div 
      className={`bg-[#0a0a0a] shadow-2xl ${containerStyle} font-sans text-[14px] leading-relaxed print:shadow-none print:w-full print:min-h-0 print:p-0 text-gray-300 relative group/template overflow-hidden`}
      style={marginStyle}
    >
      {/* Interactive controls overlay (hidden when printing) */}
      <Reorder.Group axis="y" values={currentSectionOrder} onReorder={(newOrder) => onSectionOrderChange?.(newOrder)}>
        {currentSectionOrder.map((sectionId) => (
          <Reorder.Item 
            key={sectionId} 
            value={sectionId} 
            style={{ marginBottom: sectionSpacing ? `${sectionSpacing}px` : '32px' }}
            className="bg-white/0"
          >
            {renderSection(sectionId)}
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
};

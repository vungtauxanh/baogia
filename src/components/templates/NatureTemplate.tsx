import React from 'react';
import { TemplateProps, Item } from '../../types';
import { Reorder } from 'motion/react';
import { GripVertical } from 'lucide-react';

const formatCurrency = (amount: number) => {
  if (!amount) return '-';
  return new Intl.NumberFormat('vi-VN').format(amount);
};

import { MoveVertical } from 'lucide-react';

export const NatureTemplate: React.FC<TemplateProps> = ({ data, onReorder, onRowSpacingChange, onSectionOrderChange }) => {
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
          <div key="business" className="flex justify-between items-center mb-12 relative group/section">
            <div className="absolute -left-8 top-0 opacity-0 group-hover/section:opacity-100 transition-opacity print:hidden cursor-grab active:cursor-grabbing p-1 bg-white rounded border border-emerald-100 shadow-sm">
              <MoveVertical size={16} className="text-emerald-600" />
            </div>
            <div className={`flex-1 ${headerAlignClass}`}>
              {businessInfo.logoPosition === 'inline-left' ? (
                <div className="flex items-center gap-4">
                  {businessInfo.logo && (
                    <img 
                      src={businessInfo.logo} 
                      alt="Logo" 
                      className="object-contain" 
                      style={{ height: businessInfo.logoSize ? `${businessInfo.logoSize}px` : '64px' }}
                    />
                  )}
                  <div>
                    <h1 className="font-black text-3xl text-emerald-800 uppercase tracking-tight mb-1">{businessInfo.name}</h1>
                    <p className="text-emerald-600 text-sm font-medium">{businessInfo.address}</p>
                  </div>
                </div>
              ) : (
                <>
                  {businessInfo.logo && (
                    <img 
                      src={businessInfo.logo} 
                      alt="Logo" 
                      className={`mb-4 object-contain ${logoAlignClass}`} 
                      style={{ height: businessInfo.logoSize ? `${businessInfo.logoSize}px` : '64px' }}
                    />
                  )}
                  <h1 className="font-black text-3xl text-emerald-800 uppercase tracking-tight mb-1">{businessInfo.name}</h1>
                  <p className="text-emerald-600 text-sm font-medium">{businessInfo.address}</p>
                </>
              )}
              <div className={`flex gap-4 mt-3 text-xs text-emerald-700/60 font-bold ${businessInfo.logoPosition === 'center' ? 'justify-center' : businessInfo.logoPosition === 'right' ? 'justify-end' : ''}`}>
                <span>MST: {businessInfo.taxCode}</span>
                <span>•</span>
                <span>SĐT: {businessInfo.phone}</span>
              </div>
            </div>
            <div className="text-right ml-4">
              <p className="text-emerald-600 font-bold mt-4">Ngày {quoteDate}</p>
            </div>
          </div>
        );
      case 'title':
        return (
          <div key="title" className="mb-12 relative group/section flex justify-center">
            <div className="absolute -left-8 top-0 opacity-0 group-hover/section:opacity-100 transition-opacity print:hidden cursor-grab active:cursor-grabbing p-1 bg-white rounded border border-emerald-100 shadow-sm">
              <MoveVertical size={16} className="text-emerald-600" />
            </div>
            <div className="bg-emerald-800 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-3xl shadow-lg shadow-emerald-900/20">
              Báo Giá
            </div>
          </div>
        );
      case 'customer':
        return (
          <div key="customer" className="bg-white/60 backdrop-blur-sm rounded-3xl border border-emerald-100 p-8 mb-10 shadow-sm relative group/section">
            <div className="absolute -left-8 top-0 opacity-0 group-hover/section:opacity-100 transition-opacity print:hidden cursor-grab active:cursor-grabbing p-1 bg-white rounded border border-emerald-100 shadow-sm">
              <MoveVertical size={16} className="text-emerald-600" />
            </div>
            <p className="text-[10px] text-emerald-400 uppercase tracking-[0.2em] mb-2 font-black">Kính gửi quý khách hàng</p>
            <p className="font-black text-2xl text-emerald-900 uppercase tracking-tight">{customerName}</p>
            {data.customerAddress && <p className="text-emerald-700 mt-1 font-medium italic">{data.customerAddress}</p>}
          </div>
        );
      case 'items':
        return (
          <div key="items" className="mb-8 relative group/section">
            <div className="absolute -left-8 top-0 opacity-0 group-hover/section:opacity-100 transition-opacity print:hidden cursor-grab active:cursor-grabbing p-1 bg-white rounded border border-emerald-100 shadow-sm">
              <MoveVertical size={16} className="text-emerald-600" />
            </div>
            <div className="bg-white rounded-3xl shadow-sm border border-emerald-50 overflow-hidden mb-10">
              <table className="w-full">
                <thead>
                  <tr className="bg-emerald-50 text-emerald-800 text-xs uppercase tracking-widest font-black">
                    <th className="py-5 px-4 text-center w-12">STT</th>
                    {businessInfo.showItemImages && <th className="py-5 px-4 text-center w-24">Hình ảnh</th>}
                    <th className="py-5 px-4 text-left">Mô tả chi tiết</th>
                    <th className="py-5 px-4 text-center w-20">Số lượng</th>
                    {!isHandoverMode && (
                    <>
                      <th className="py-5 px-4 text-right w-32">Đơn giá</th>
                    <th className="py-5 px-4 text-right w-32">Thành tiền</th>
                    </>
                  )}
                  </tr>
                </thead>
                <Reorder.Group as="tbody" axis="y" values={items} onReorder={(newItems) => onReorder?.(newItems)} className="divide-y divide-emerald-50">
                  {items.map((item, index) => {
                    const amount = item.quantity * item.price;
                    return (
                      <Reorder.Item 
                        key={item.id} 
                        value={item} 
                        as="tr" 
                        style={{ height: rowSpacing ? `${40 + rowSpacing}px` : '40px' }}
                        className="hover:bg-emerald-50/30 transition-colors group/row cursor-default bg-white"
                      >
                        <td className="py-5 px-4 text-center text-emerald-300 font-black relative">
                          {index + 1}
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-0 group-hover/row:opacity-100 transition-opacity print:hidden cursor-grab active:cursor-grabbing p-1 bg-emerald-50 rounded border border-emerald-200 -left-4">
                            <GripVertical size={14} className="text-emerald-600" />
                          </div>
                        </td>
                        {businessInfo.showItemImages && (
                          <td className="py-5 px-4 text-center">
                            {item.image ? (
                              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-2xl shadow-sm border border-emerald-100 mx-auto" />
                            ) : (
                              <div className="w-16 h-16 bg-emerald-50 rounded-2xl mx-auto flex items-center justify-center text-[10px] text-emerald-200 font-bold">NO IMG</div>
                            )}
                          </td>
                        )}
                        <td className="py-5 px-4">
                          <p className="font-black text-emerald-900 whitespace-pre-wrap">{item.name}</p>
                          {item.note && <p className="text-xs text-emerald-600/70 mt-1 font-medium">{item.note}</p>}
                        </td>
                        <td className="py-5 px-4 text-center">
                          <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-black">{item.quantity} {item.unit}</span>
                        </td>
                        {!isHandoverMode && (
                        <>
                          <td className="py-5 px-4 text-right text-emerald-700 font-medium">{formatCurrency(item.price)}</td>
                        <td className="py-5 px-4 text-right font-black text-emerald-900">{formatCurrency(amount)}</td>
                        </>
                      )}
                      </Reorder.Item>
                    );
                  })}
                </Reorder.Group>
              </table>
            </div>
            <div className="flex justify-end">
              <div className="w-80 bg-emerald-900 text-white p-8 rounded-[2.5rem] shadow-xl shadow-emerald-900/20">
                <div className="flex justify-between mb-3 opacity-70 text-xs font-bold uppercase tracking-widest">
                  <span>Cộng tiền hàng:</span>
                  <span>{formatCurrency(data.subtotal)}</span>
                </div>
                <div className="flex justify-between mb-6 pb-6 border-b border-emerald-700/50 opacity-70 text-xs font-bold uppercase tracking-widest">
                  <span>Thuế VAT {data.isVatIncluded ? '' : `(${data.vatRate}%):`}</span>
                  <span>{data.isVatIncluded ? 'Đã bao gồm' : formatCurrency(data.subtotal * (data.vatRate / 100))}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Tổng cộng:</span>
                  <span className="text-3xl font-black">{formatCurrency(data.total)}</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'footer':
        return (
          <div key="footer" className="grid grid-cols-2 gap-12 relative group/section">
            <div className="absolute -left-8 top-0 opacity-0 group-hover/section:opacity-100 transition-opacity print:hidden cursor-grab active:cursor-grabbing p-1 bg-white rounded border border-emerald-100 shadow-sm">
              <MoveVertical size={16} className="text-emerald-600" />
            </div>
            <div className="text-xs text-emerald-800/70">
              <p className="font-black text-emerald-800 mb-3 uppercase tracking-widest">Ghi chú & Thanh toán</p>
              {businessInfo.showPaymentInfo && (
                <div className="mb-4 bg-white/40 p-4 rounded-2xl border border-emerald-100">
                  <div className="whitespace-pre-wrap leading-relaxed font-medium">{businessInfo.paymentInfo}</div>
                </div>
              )}
              {businessInfo.showNotes && (
                <div className="bg-white/40 p-4 rounded-2xl border border-emerald-100">
                  <div className="whitespace-pre-wrap leading-relaxed font-medium">{businessInfo.notes}</div>
                </div>
              )}
            </div>
            <div className="text-center">
              <p className="font-black text-emerald-900 uppercase tracking-widest mb-10">Đại diện đơn vị</p>
              {businessInfo.signature ? (
                <img 
                  src={businessInfo.signature} 
                  alt="Signature" 
                  className="mx-auto object-contain mb-4" 
                  style={{ height: businessInfo.signatureSize ? `${businessInfo.signatureSize}px` : '80px' }}
                />
              ) : (
                <div className="mb-4" style={{ height: businessInfo.signatureSize ? `${businessInfo.signatureSize}px` : '80px' }}></div>
              )}
              <div className="w-48 h-1 bg-emerald-100 mx-auto mb-3 rounded-full"></div>
              <p className="font-black text-emerald-900 uppercase tracking-tight">{businessInfo.name}</p>
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
      className={`bg-[#fdfcf0] shadow-2xl ${containerStyle} font-sans text-[14px] leading-relaxed print:shadow-none print:w-full print:min-h-0 print:p-0 text-emerald-900 relative group/template overflow-hidden`}
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

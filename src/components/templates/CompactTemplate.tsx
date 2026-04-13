import React from 'react';
import { TemplateProps, Item } from '../../types';
import { Reorder } from 'motion/react';
import { GripVertical } from 'lucide-react';

const formatCurrency = (amount: number) => {
  if (!amount) return '-';
  return new Intl.NumberFormat('vi-VN').format(amount);
};

import { MoveVertical } from 'lucide-react';

export const CompactTemplate: React.FC<TemplateProps> = ({ data, onReorder, onRowSpacingChange, onSectionOrderChange }) => {
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
          <div key="business" className="flex justify-between items-start mb-4 border-b border-gray-100 pb-4 relative group/section">
            <div className="absolute -left-8 top-0 opacity-0 group-hover/section:opacity-100 transition-opacity print:hidden cursor-grab active:cursor-grabbing p-1 bg-white rounded border border-gray-100 shadow-sm">
              <MoveVertical size={14} className="text-gray-400" />
            </div>
            <div className={`flex-1 ${headerAlignClass}`}>
              {businessInfo.logoPosition === 'inline-left' ? (
                <div className="flex items-center gap-2">
                  {businessInfo.logo && (
                    <img 
                      src={businessInfo.logo} 
                      alt="Logo" 
                      className="object-contain" 
                      style={{ height: businessInfo.logoSize ? `${businessInfo.logoSize * 0.8}px` : '40px' }}
                    />
                  )}
                  <div>
                    <h1 className="font-bold text-lg text-gray-900 uppercase tracking-tight">{businessInfo.name}</h1>
                    <p className="text-gray-500 text-[10px]">{businessInfo.address}</p>
                  </div>
                </div>
              ) : (
                <>
                  {businessInfo.logo && (
                    <img 
                      src={businessInfo.logo} 
                      alt="Logo" 
                      className={`mb-1 object-contain ${logoAlignClass}`} 
                      style={{ height: businessInfo.logoSize ? `${businessInfo.logoSize * 0.8}px` : '40px' }}
                    />
                  )}
                  <h1 className="font-bold text-lg text-gray-900 uppercase tracking-tight">{businessInfo.name}</h1>
                  <p className="text-gray-500 text-[10px]">{businessInfo.address}</p>
                </>
              )}
              <div className={`flex gap-3 mt-1 text-[10px] text-gray-400 font-medium ${businessInfo.logoPosition === 'center' ? 'justify-center' : businessInfo.logoPosition === 'right' ? 'justify-end' : ''}`}>
                <span>MST: {businessInfo.taxCode}</span>
                <span>•</span>
                <span>ĐT: {businessInfo.phone}</span>
              </div>
            </div>
            <div className="text-right ml-4">
              <p className="text-gray-400 text-[10px]">Ngày {quoteDate}</p>
            </div>
          </div>
        );
      case 'title':
        return (
          <div key="title" className="mb-4 relative group/section text-center">
            <div className="absolute -left-8 top-0 opacity-0 group-hover/section:opacity-100 transition-opacity print:hidden cursor-grab active:cursor-grabbing p-1 bg-white rounded border border-gray-100 shadow-sm">
              <MoveVertical size={14} className="text-gray-400" />
            </div>
            <h2 className="font-black text-xl text-gray-800 uppercase tracking-tighter">{isHandoverMode ? "BIÊN BẢN BÀN GIAO" : "BÁO GIÁ"}</h2>
          </div>
        );
      case 'customer':
        return (
          <div key="customer" className="bg-gray-50 p-3 mb-4 flex justify-between items-center rounded-sm relative group/section">
            <div className="absolute -left-8 top-0 opacity-0 group-hover/section:opacity-100 transition-opacity print:hidden cursor-grab active:cursor-grabbing p-1 bg-white rounded border border-gray-100 shadow-sm">
              <MoveVertical size={14} className="text-gray-400" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">Khách hàng</p>
              <p className="font-bold text-gray-800">{customerName}</p>
              {data.customerAddress && <p className="text-gray-500 text-[10px]">{data.customerAddress}</p>}
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">Số báo giá</p>
              <p className="font-bold text-gray-800">Q-{Date.now().toString().slice(-6)}</p>
            </div>
          </div>
        );
      case 'items':
        return (
          <div key="items" className="mb-4 relative group/section">
            <div className="absolute -left-8 top-0 opacity-0 group-hover/section:opacity-100 transition-opacity print:hidden cursor-grab active:cursor-grabbing p-1 bg-white rounded border border-gray-100 shadow-sm">
              <MoveVertical size={14} className="text-gray-400" />
            </div>
            <table className="w-full mb-4 border-collapse">
              <thead>
                <tr className="bg-gray-800 text-white text-[10px] uppercase tracking-wider">
                  <th className="py-1.5 px-2 text-center w-8">#</th>
                  {businessInfo.showItemImages && <th className="py-1.5 px-2 text-center w-12">HÌNH</th>}
                  <th className="py-1.5 px-2 text-left">MÔ TẢ</th>
                  <th className="py-1.5 px-2 text-center w-12">SL</th>
                  <th className="py-1.5 px-2 text-right w-24">ĐƠN GIÁ</th>
                  <th className="py-1.5 px-2 text-right w-24">T.TIỀN</th>
                </tr>
              </thead>
              <Reorder.Group as="tbody" axis="y" values={items} onReorder={(newItems) => onReorder?.(newItems)} className="divide-y divide-gray-100">
                {items.map((item, index) => {
                  const amount = item.quantity * item.price;
                  return (
                    <Reorder.Item 
                      key={item.id} 
                      value={item} 
                      as="tr" 
                      style={{ height: rowSpacing ? `${30 + rowSpacing}px` : '30px' }}
                      className="hover:bg-gray-50/50 transition-colors group/row cursor-default bg-white"
                    >
                      <td className="py-2 px-2 text-center text-gray-400 relative">
                        {index + 1}
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-0 group-hover/row:opacity-100 transition-opacity print:hidden cursor-grab active:cursor-grabbing p-1 bg-blue-50 rounded border border-blue-200 -left-4">
                          <GripVertical size={12} className="text-blue-500" />
                        </div>
                      </td>
                      {businessInfo.showItemImages && (
                        <td className="py-2 px-2 text-center">
                          {item.image && <img src={item.image} alt={item.name} className="w-8 h-8 object-cover rounded-sm mx-auto" />}
                        </td>
                      )}
                      <td className="py-2 px-2">
                        <p className="font-bold text-gray-800 whitespace-pre-wrap">{item.name}</p>
                        {item.note && <p className="text-[10px] text-gray-400 mt-0.5">{item.note}</p>}
                      </td>
                      <td className="py-2 px-2 text-center text-gray-600">{item.quantity} {item.unit}</td>
                      {!isHandoverMode && (
                        <>
                          <td className="py-2 px-2 text-right text-gray-600">{formatCurrency(item.price)}</td>
                      <td className="py-2 px-2 text-right font-bold text-gray-800">{formatCurrency(amount)}</td>
                        </>
                      )}
                    </Reorder.Item>
                  );
                })}
              </Reorder.Group>
            </table>
            <div className="flex justify-end">
              <div className="w-64 border-t-2 border-gray-800 pt-2">
                <div className="flex justify-between mb-1 text-[10px]">
                  <span className="text-gray-500">Cộng tiền hàng:</span>
                  <span className="font-medium">{formatCurrency(data.subtotal)}</span>
                </div>
                <div className="flex justify-between mb-2 text-[10px] pb-1 border-b border-gray-100">
                  <span className="text-gray-500">Thuế VAT {data.isVatIncluded ? '' : `(${data.vatRate}%):`}</span>
                  <span className="font-medium">{data.isVatIncluded ? 'Đã bao gồm' : formatCurrency(data.subtotal * (data.vatRate / 100))}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-black text-gray-800 uppercase tracking-tighter">Tổng cộng:</span>
                  <span className="text-lg font-black text-gray-900">{formatCurrency(data.total)}</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'footer':
        return (
          <div key="footer" className="grid grid-cols-2 gap-4 relative group/section">
            <div className="absolute -left-8 top-0 opacity-0 group-hover/section:opacity-100 transition-opacity print:hidden cursor-grab active:cursor-grabbing p-1 bg-white rounded border border-gray-100 shadow-sm">
              <MoveVertical size={14} className="text-gray-400" />
            </div>
            <div className="text-[10px] text-gray-500">
              {businessInfo.showPaymentInfo && (
                <div className="mb-2">
                  <p className="font-bold text-gray-700 mb-0.5">Thanh toán:</p>
                  <div className="whitespace-pre-wrap leading-tight opacity-80">{businessInfo.paymentInfo}</div>
                </div>
              )}
              {businessInfo.showNotes && (
                <div>
                  <p className="font-bold text-gray-700 mb-0.5">Ghi chú:</p>
                  <div className="whitespace-pre-wrap leading-tight opacity-80">{businessInfo.notes}</div>
                </div>
              )}
            </div>
            <div className="text-center">
              <p className="font-bold text-gray-800 uppercase tracking-widest text-[10px] mb-6">Đại diện đơn vị</p>
              {businessInfo.signature ? (
                <img 
                  src={businessInfo.signature} 
                  alt="Signature" 
                  className="mx-auto object-contain mb-1" 
                  style={{ height: businessInfo.signatureSize ? `${businessInfo.signatureSize * 0.7}px` : '50px' }}
                />
              ) : (
                <div className="mb-1" style={{ height: businessInfo.signatureSize ? `${businessInfo.signatureSize * 0.7}px` : '50px' }}></div>
              )}
              <div className="w-32 h-px bg-gray-200 mx-auto mb-1"></div>
              <p className="font-bold text-gray-800 text-[10px] uppercase tracking-tight">{businessInfo.name}</p>
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
  } : { padding: '8mm' };

  return (
    <div 
      className={`bg-white shadow-2xl ${containerStyle} font-sans text-[12px] leading-tight print:shadow-none print:w-full print:min-h-0 print:p-0 text-gray-700 relative group/template`}
      style={marginStyle}
    >
      {/* Interactive controls overlay (hidden when printing) */}
      <Reorder.Group axis="y" values={currentSectionOrder} onReorder={(newOrder) => onSectionOrderChange?.(newOrder)}>
        {currentSectionOrder.map((sectionId) => (
          <Reorder.Item 
            key={sectionId} 
            value={sectionId} 
            style={{ marginBottom: sectionSpacing ? `${sectionSpacing}px` : '16px' }}
            className="bg-white/0"
          >
            {renderSection(sectionId)}
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
};

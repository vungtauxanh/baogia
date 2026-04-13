import React from 'react';
import { TemplateProps, Item } from '../../types';
import { Reorder } from 'motion/react';
import { GripVertical } from 'lucide-react';

const formatCurrency = (amount: number) => {
  if (!amount) return '-';
  return new Intl.NumberFormat('vi-VN').format(amount);
};

import { MoveVertical } from 'lucide-react';

export const ElegantTemplate: React.FC<TemplateProps> = ({ data, onReorder, onRowSpacingChange, onSectionOrderChange }) => {
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
          <div key="business" className={`mb-8 border-b-2 border-amber-200 pb-6 ${headerAlignClass} relative group/section`}>
            <div className="absolute -left-8 top-0 opacity-0 group-hover/section:opacity-100 transition-opacity print:hidden cursor-grab active:cursor-grabbing p-1 bg-white rounded border border-amber-100 shadow-sm">
              <MoveVertical size={16} className="text-amber-600" />
            </div>
            {businessInfo.logoPosition === 'inline-left' ? (
              <div className="flex items-center gap-4">
                {businessInfo.logo && (
                  <img 
                    src={businessInfo.logo} 
                    alt="Logo" 
                    className="object-contain" 
                    style={{ height: businessInfo.logoSize ? `${businessInfo.logoSize}px` : '80px' }}
                  />
                )}
                <div>
                  <h1 className="font-bold text-3xl text-amber-800 uppercase tracking-widest mb-2">{businessInfo.name}</h1>
                  <p className="text-sm text-gray-600 mb-1">{businessInfo.address}</p>
                </div>
              </div>
            ) : (
              <>
                {businessInfo.logo && (
                  <img 
                    src={businessInfo.logo} 
                    alt="Logo" 
                    className={`mb-4 object-contain ${logoAlignClass}`} 
                    style={{ height: businessInfo.logoSize ? `${businessInfo.logoSize}px` : '80px' }}
                  />
                )}
                <h1 className="font-bold text-3xl text-amber-800 uppercase tracking-widest mb-2">{businessInfo.name}</h1>
                <p className="text-sm text-gray-600 mb-1">{businessInfo.address}</p>
              </>
            )}
            <p className="text-sm text-gray-600">MST: {businessInfo.taxCode} | ĐT: {businessInfo.phone}</p>
          </div>
        );
      case 'title':
        return (
          <div key="title" className="mb-8 relative group/section text-center">
            <div className="absolute -left-8 top-0 opacity-0 group-hover/section:opacity-100 transition-opacity print:hidden cursor-grab active:cursor-grabbing p-1 bg-white rounded border border-amber-100 shadow-sm">
              <MoveVertical size={16} className="text-amber-600" />
            </div>
            <h2 className="font-bold text-4xl uppercase tracking-widest text-gray-900 mb-2">Báo Giá</h2>
            <div className="w-16 h-1 bg-amber-400 mx-auto"></div>
          </div>
        );
      case 'customer':
        return (
          <div key="customer" className="mb-8 relative group/section">
            <div className="absolute -left-8 top-0 opacity-0 group-hover/section:opacity-100 transition-opacity print:hidden cursor-grab active:cursor-grabbing p-1 bg-white rounded border border-amber-100 shadow-sm">
              <MoveVertical size={16} className="text-amber-600" />
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Kính gửi</p>
                <p className="font-bold text-lg">{customerName}</p>
                {data.customerAddress && <p className="text-sm text-gray-600 mt-1">{data.customerAddress}</p>}
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Ngày lập</p>
                <p className="font-medium">{quoteDate}</p>
              </div>
            </div>
          </div>
        );
      case 'items':
        return (
          <div key="items" className="mb-8 relative group/section">
            <div className="absolute -left-8 top-0 opacity-0 group-hover/section:opacity-100 transition-opacity print:hidden cursor-grab active:cursor-grabbing p-1 bg-white rounded border border-amber-100 shadow-sm">
              <MoveVertical size={16} className="text-amber-600" />
            </div>
            <table className="w-full mb-8">
              <thead>
                <tr className="border-b-2 border-gray-800">
                  <th className="py-3 px-2 text-center w-12 font-bold text-sm">STT</th>
                  {businessInfo.showItemImages && <th className="py-3 px-2 text-center w-20 font-bold text-sm">Hình</th>}
                  <th className="py-3 px-2 text-left font-bold text-sm">Mô tả</th>
                  <th className="py-3 px-2 text-center w-16 font-bold text-sm">ĐVT</th>
                  <th className="py-3 px-2 text-center w-16 font-bold text-sm">SL</th>
                  {!isHandoverMode && (
                    <>
                      <th className="py-3 px-2 text-right w-28 font-bold text-sm">Đơn giá</th>
                  <th className="py-3 px-2 text-right w-32 font-bold text-sm">Thành tiền</th>
                    </>
                  )}
                </tr>
              </thead>
              <Reorder.Group as="tbody" axis="y" values={items} onReorder={(newItems) => onReorder?.(newItems)}>
                {items.map((item, index) => {
                  const amount = item.quantity * item.price;
                  return (
                    <Reorder.Item 
                      key={item.id} 
                      value={item} 
                      as="tr" 
                      style={{ height: rowSpacing ? `${40 + rowSpacing}px` : '40px' }}
                      className="border-b border-gray-200 group/row cursor-default bg-white"
                    >
                      <td className="py-4 px-2 text-center text-gray-500 relative">
                        {index + 1}
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-0 group-hover/row:opacity-100 transition-opacity print:hidden cursor-grab active:cursor-grabbing p-1 bg-blue-50 rounded border border-blue-200 -left-4">
                          <GripVertical size={14} className="text-blue-500" />
                        </div>
                      </td>
                      {businessInfo.showItemImages && (
                        <td className="py-4 px-2 text-center">
                          {item.image && <img src={item.image} alt={item.name} className="w-12 h-12 object-contain mx-auto" />}
                        </td>
                      )}
                      <td className="py-4 px-2">
                        <p className="font-medium text-gray-900 whitespace-pre-wrap">{item.name}</p>
                        {item.note && <p className="text-sm text-gray-500 mt-1 italic">{item.note}</p>}
                      </td>
                      <td className="py-4 px-2 text-center text-gray-600">{item.unit}</td>
                      <td className="py-4 px-2 text-center text-gray-600">{item.quantity || ''}</td>
                      {!isHandoverMode && (
                        <>
                          <td className="py-4 px-2 text-right text-gray-600">{formatCurrency(item.price)}</td>
                      <td className="py-4 px-2 text-right font-medium text-gray-900">{formatCurrency(amount)}</td>
                        </>
                      )}
                    </Reorder.Item>
                  );
                })}
              </Reorder.Group>
            </table>
            <div className="flex justify-end">
              <div className="w-1/2">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Cộng tiền hàng:</span>
                  <span className="font-medium">{formatCurrency(data.subtotal)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Thuế VAT {data.isVatIncluded ? '' : `(${data.vatRate}%)`}:</span>
                  <span className="font-medium">{data.isVatIncluded ? 'Đã bao gồm' : formatCurrency(data.subtotal * (data.vatRate / 100))}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="font-bold text-lg text-gray-900">Tổng cộng:</span>
                  <span className="font-bold text-lg text-amber-700">{formatCurrency(data.total)}</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'footer':
        return (
          <div key="footer" className="grid grid-cols-2 gap-8 relative group/section">
            <div className="absolute -left-8 top-0 opacity-0 group-hover/section:opacity-100 transition-opacity print:hidden cursor-grab active:cursor-grabbing p-1 bg-white rounded border border-amber-100 shadow-sm">
              <MoveVertical size={16} className="text-amber-600" />
            </div>
            <div>
              {businessInfo.showPaymentInfo && (
                <div className="mb-6">
                  <h3 className="font-bold text-sm uppercase tracking-wider mb-2 text-gray-900">Thanh toán</h3>
                  <div className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">{businessInfo.paymentInfo}</div>
                </div>
              )}
              {businessInfo.showNotes && (
                <div>
                  <h3 className="font-bold text-sm uppercase tracking-wider mb-2 text-gray-900">Ghi chú</h3>
                  <div className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">{businessInfo.notes}</div>
                </div>
              )}
            </div>
            <div className="text-center">
              <p className="font-bold uppercase tracking-widest text-sm mb-12 text-gray-900">Đại diện đơn vị</p>
              {businessInfo.signature ? (
                <img 
                  src={businessInfo.signature} 
                  alt="Signature" 
                  className="mx-auto object-contain mb-2" 
                  style={{ height: businessInfo.signatureSize ? `${businessInfo.signatureSize}px` : '80px' }}
                />
              ) : (
                <div className="mb-2" style={{ height: businessInfo.signatureSize ? `${businessInfo.signatureSize}px` : '80px' }}></div>
              )}
              <div className="w-40 h-px bg-gray-300 mx-auto mb-2"></div>
              <p className="font-bold text-gray-900">{businessInfo.name}</p>
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
      className={`bg-[#fcfbf9] shadow-2xl ${containerStyle} font-serif text-gray-800 leading-relaxed print:shadow-none print:w-full print:min-h-0 print:p-0 relative group/template`}
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

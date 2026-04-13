import React from 'react';
import { TemplateProps, Item } from '../../types';
import { Reorder } from 'motion/react';
import { GripVertical } from 'lucide-react';

const formatCurrency = (amount: number) => {
  if (!amount) return '-';
  return new Intl.NumberFormat('vi-VN').format(amount);
};

import { MoveVertical } from 'lucide-react';

export const CreativeTemplate: React.FC<TemplateProps> = ({ 
  data, 
  onReorder, 
  onRowSpacingChange, 
  onSectionOrderChange,
  onSectionSpacingChange,
  onColumnWidthsChange,
  onQuoteDateChange,
  activeRowId,
  onActiveRowChange
}) => {
  const { businessInfo, 
    customerName, 
    items, 
    total, 
    rowSpacing, 
    printOrientation, 
    margins, 
    sectionOrder, 
    sectionSpacing,
    quoteDate,
    columnWidths, isHandoverMode, customerRepresentative, customerPosition } = data;
  
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

  const currentSectionOrder = sectionOrder || ['business', 'title', 'date', 'customer', 'items', 'footer'];

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'business':
        return (
          <div key="business" className="flex justify-between items-center mb-0 relative group/section">
            <div className="absolute -left-8 top-0 opacity-0 group-hover/section:opacity-100 transition-opacity print:hidden cursor-grab active:cursor-grabbing p-1 bg-gray-100 rounded border border-gray-300">
              <MoveVertical size={16} className="text-gray-500" />
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
                    <h1 className="font-black text-3xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-teal-500 uppercase tracking-tight mb-1">
                      {businessInfo.name}
                    </h1>
                    <p className="text-gray-500 text-sm">{businessInfo.address}</p>
                  </div>
                </div>
              ) : (
                <>
                  {businessInfo.logo && (
                    <img 
                      src={businessInfo.logo} 
                      alt="Logo" 
                      className={`mb-3 object-contain ${logoAlignClass}`} 
                      style={{ height: businessInfo.logoSize ? `${businessInfo.logoSize}px` : '64px' }}
                    />
                  )}
                  <h1 className="font-black text-3xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-teal-500 uppercase tracking-tight mb-1">
                    {businessInfo.name}
                  </h1>
                  <p className="text-gray-500 text-sm">{businessInfo.address}</p>
                </>
              )}
              <div className={`flex gap-4 mt-2 text-xs text-gray-400 font-medium ${businessInfo.logoPosition === 'center' ? 'justify-center' : businessInfo.logoPosition === 'right' ? 'justify-end' : ''}`}>
                <span>MST: {businessInfo.taxCode}</span>
                <span>•</span>
                <span>ĐT: {businessInfo.phone}</span>
              </div>
            </div>
          </div>
        );
      case 'title':
        return (
          <div key="title" className="mb-0 relative group/section flex justify-center">
            <div className="absolute -left-8 top-0 opacity-0 group-hover/section:opacity-100 transition-opacity print:hidden cursor-grab active:cursor-grabbing p-1 bg-gray-100 rounded border border-gray-300">
              <MoveVertical size={16} className="text-gray-500" />
            </div>
            <div className="bg-gradient-to-r from-purple-600 to-teal-500 text-white px-8 py-3 rounded-full font-bold tracking-widest uppercase text-2xl shadow-lg">
              Báo Giá
            </div>
          </div>
        );
      case 'date':
        return (
          <div key="date" className="mb-0 relative group/section text-right">
            <div className="absolute -left-8 top-0 opacity-0 group-hover/section:opacity-100 transition-opacity print:hidden cursor-grab active:cursor-grabbing p-1 bg-gray-100 rounded border border-gray-300">
              <MoveVertical size={16} className="text-gray-500" />
            </div>
            <div className="flex justify-end items-center gap-2">
              <span className="text-gray-400 text-sm font-medium">Ngày:</span>
              <input 
                type="text"
                placeholder="Nhập ngày tháng..." 
                value={quoteDate || ''} 
                onChange={(e) => onQuoteDateChange?.(e.target.value)}
                className="border-none bg-transparent font-medium focus:ring-0 p-0 w-48 text-right print:hidden"
              />
              <span className="hidden print:inline font-medium">
                {quoteDate}
              </span>
            </div>
          </div>
        );
      case 'customer':
        return (
          <div key="customer" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 relative overflow-hidden group/section">
            <div className="absolute -left-8 top-0 opacity-0 group-hover/section:opacity-100 transition-opacity print:hidden cursor-grab active:cursor-grabbing p-1 bg-gray-100 rounded border border-gray-300">
              <MoveVertical size={16} className="text-gray-500" />
            </div>
            <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-purple-500 to-teal-400"></div>
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-bold">Kính gửi khách hàng</p>
            <p className="font-bold text-xl text-gray-800">{customerName}</p>
            {data.customerAddress && <p className="text-gray-500 text-sm mt-1">{data.customerAddress}</p>}
          </div>
        );
      case 'items':
        return (
          <div key="items" className="mb-8 relative group/section">
            <div className="absolute -left-8 top-0 opacity-0 group-hover/section:opacity-100 transition-opacity print:hidden cursor-grab active:cursor-grabbing p-1 bg-gray-100 rounded border border-gray-300">
              <MoveVertical size={16} className="text-gray-500" />
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
              <table className="w-full table-fixed">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                    <th className="py-4 px-4 text-center font-bold" style={{ width: `${columnWidths?.stt || 5}%` }}>STT</th>
                    {businessInfo.showItemImages && <th className="py-4 px-4 text-center font-bold w-20">Hình</th>}
                    <th className="py-4 px-4 text-left font-bold" style={{ width: `${columnWidths?.name || 40}%` }}>Sản phẩm</th>
                    <th className="py-4 px-4 text-center font-bold" style={{ width: `${columnWidths?.unit || 10}%` }}>ĐVT</th>
                    <th className="py-4 px-4 text-center font-bold" style={{ width: `${columnWidths?.quantity || 10}%` }}>SL</th>
                    {!isHandoverMode && (
                    <>
                      <th className="py-4 px-4 text-right font-bold" style={{ width: `${columnWidths?.price || 15}%` }}>Đơn giá</th>
                    <th className="py-4 px-4 text-right font-bold" style={{ width: `${columnWidths?.amount || 20}%` }}>Thành tiền</th>
                    </>
                  )}
                  </tr>
                </thead>
                <Reorder.Group as="tbody" axis="y" values={items} onReorder={(newItems) => onReorder?.(newItems)} className="divide-y divide-gray-50">
                  {items.map((item, index) => {
                    const amount = item.quantity * item.price;
                  if (item.isTextOnly) {
                    return (
                      <Reorder.Item 
                        key={item.id} 
                        value={item} 
                        as="tr" 
                        className="group/row cursor-default bg-white border-b border-gray-100"
                      >
                        <td colSpan={isHandoverMode ? (businessInfo.showItemImages ? 5 : 4) : (businessInfo.showItemImages ? 7 : 6)} className="p-3 relative">
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-0 group-hover/row:opacity-100 transition-opacity print:hidden cursor-grab active:cursor-grabbing p-1 bg-blue-50 rounded border border-blue-200 -left-6">
                            <GripVertical size={14} className="text-blue-500" />
                          </div>
                          <div className="font-bold whitespace-pre-wrap">{item.name}</div>
                          {item.note && <div className="italic text-sm whitespace-pre-wrap mt-1">{item.note}</div>}
                        </td>
                      </Reorder.Item>
                    );
                  }

                    return (
                      <Reorder.Item 
                        key={item.id} 
                        value={item} 
                        as="tr" 
                        style={{ height: rowSpacing ? `${40 + rowSpacing}px` : '40px' }}
                        className="hover:bg-gray-50/50 transition-colors group/row cursor-default bg-white"
                      >
                        <td className="py-4 px-4 text-center text-gray-400 font-medium relative">
                          {index + 1}
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-0 group-hover/row:opacity-100 transition-opacity print:hidden cursor-grab active:cursor-grabbing p-1 bg-blue-50 rounded border border-blue-200 -left-4">
                            <GripVertical size={14} className="text-blue-500" />
                          </div>
                        </td>
                        {businessInfo.showItemImages && (
                          <td className="py-4 px-4 text-center">
                            {item.image ? (
                              <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-xl shadow-sm mx-auto" />
                            ) : (
                              <div className="w-12 h-12 bg-gray-100 rounded-xl mx-auto flex items-center justify-center text-gray-300 text-xs">No img</div>
                            )}
                          </td>
                        )}
                        <td className="py-4 px-4">
                          <p className="font-bold text-gray-800 whitespace-pre-wrap">{item.name}</p>
                          {item.note && <p className="text-xs text-gray-500 mt-1">{item.note}</p>}
                        </td>
                        <td className="py-4 px-4 text-center text-gray-600">
                          <span className="bg-gray-100 px-2 py-1 rounded-md text-xs font-bold">{item.quantity} {item.unit}</span>
                        </td>
                        {!isHandoverMode && (
                        <>
                          <td className="py-4 px-4 text-right text-gray-600 font-medium">{formatCurrency(item.price)}</td>
                        <td className="py-4 px-4 text-right font-bold text-gray-800">{formatCurrency(amount)}</td>
                        </>
                      )}
                      </Reorder.Item>
                    );
                  })}
                </Reorder.Group>
              </table>
            </div>
            <div className="flex justify-end">
              <div className="w-80 bg-gradient-to-br from-purple-600 to-teal-500 p-1 rounded-2xl shadow-lg">
                <div className="bg-white rounded-xl p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-500 font-medium">Cộng tiền hàng</span>
                    <span className="font-bold text-gray-800">{formatCurrency(data.subtotal)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-500 font-medium">Thuế VAT {data.isVatIncluded ? '' : `(${data.vatRate}%)`}</span>
                    <span className="font-bold text-gray-800">{data.isVatIncluded ? 'Đã bao gồm' : formatCurrency(data.subtotal * (data.vatRate / 100))}</span>
                  </div>
                  <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-gray-400 text-xs uppercase tracking-widest font-bold">Thanh toán</span>
                    <span className="font-black text-2xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-teal-500">
                      {formatCurrency(data.total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'footer':
        return (
          <div key="footer" className="flex justify-between items-end mt-16 text-sm relative group/section">
            <div className="absolute -left-8 top-0 opacity-0 group-hover/section:opacity-100 transition-opacity print:hidden cursor-grab active:cursor-grabbing p-1 bg-gray-100 rounded border border-gray-300">
              <MoveVertical size={16} className="text-gray-500" />
            </div>
            <div className="text-gray-500 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <p className="font-bold text-gray-700 mb-2">Thông tin thêm</p>
              {businessInfo.showPaymentInfo && (
                <div className="mb-2">
                  {businessInfo.paymentInfo ? (
                    <div className="whitespace-pre-wrap">{businessInfo.paymentInfo}</div>
                  ) : (
                    <p>• Thanh toán: Tiền mặt / Chuyển khoản</p>
                  )}
                </div>
              )}
              {businessInfo.showNotes && (
                <div>
                  {businessInfo.notes ? (
                    <div className="whitespace-pre-wrap">{businessInfo.notes}</div>
                  ) : (
                    <p>• Báo giá có hiệu lực 30 ngày</p>
                  )}
                </div>
              )}
            </div>
            <div className="text-center px-8">
              <p className="font-bold text-gray-800 mb-2">Người lập báo giá</p>
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
              <div className="w-32 h-0.5 bg-gray-200 mx-auto"></div>
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
      className={`bg-white shadow-2xl ${containerStyle} font-sans text-[14px] leading-relaxed print:shadow-none print:w-full print:min-h-0 print:p-0 relative overflow-hidden group/template`}
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

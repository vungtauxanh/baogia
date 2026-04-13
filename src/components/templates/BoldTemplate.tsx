import React from 'react';
import { TemplateProps, Item, LayoutRow } from '../../types';
import { Reorder } from 'motion/react';
import { GripVertical, MoveVertical, Plus, Minus, AlignLeft, AlignCenter, AlignRight, Settings, X, GripHorizontal } from 'lucide-react';

const formatCurrency = (amount: number) => {
  if (!amount) return '-';
  return new Intl.NumberFormat('vi-VN').format(amount);
};

export const BoldTemplate: React.FC<TemplateProps> = ({ 
  data, 
  onReorder, 
  onRowSpacingChange, 
  onSectionOrderChange,
  onSectionSpacingChange,
  onSectionColumnsChange,
  onLayoutChange,
  onComponentSettingsChange,
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
    sectionColumns,
    layout,
    componentSettings,
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

  const currentLayout = layout || [
    { id: 'row1', columns: ['business'], spacing: 20 },
    { id: 'row2', columns: ['title'], spacing: 10 },
    { id: 'row3', columns: ['date'], spacing: 10 },
    { id: 'row4', columns: ['customer'], spacing: 20 },
    { id: 'row5', columns: ['items'], spacing: 20 },
    { id: 'row6', columns: ['footer'], spacing: 20 }
  ];

  const currentComponentSettings = componentSettings || {};

  const renderComponent = (componentId: string, rowId: string, colIdx: number) => {
    const settings = currentComponentSettings[componentId] || { alignment: 'left' };
    const alignmentClass = 
      settings.alignment === 'center' ? 'text-center' : 
      settings.alignment === 'right' ? 'text-right' : 'text-left';

    const componentWrapper = (content: React.ReactNode, rowId: string, colIdx: number) => (
      <div className={`relative group/comp w-full ${alignmentClass} focus:outline-none`} tabIndex={0}>
        <div className="absolute -top-6 left-0 flex items-center gap-1 opacity-0 group-hover/comp:opacity-100 group-focus-within/comp:opacity-100 group-focus/comp:opacity-100 transition-opacity print:hidden z-30 bg-white border rounded shadow-sm p-1">
          <div className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded text-gray-400" title="Kéo để đổi vị trí cột">
            <GripHorizontal size={12} />
          </div>
          <div className="w-px h-3 bg-gray-200 mx-1"></div>
          <button 
            onClick={() => {
              const newSettings = { ...currentComponentSettings };
              newSettings[componentId] = { ...settings, alignment: 'left' };
              onComponentSettingsChange?.(newSettings);
            }}
            className={`p-1 rounded ${settings.alignment === 'left' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
          >
            <AlignLeft size={12} />
          </button>
          <button 
            onClick={() => {
              const newSettings = { ...currentComponentSettings };
              newSettings[componentId] = { ...settings, alignment: 'center' };
              onComponentSettingsChange?.(newSettings);
            }}
            className={`p-1 rounded ${settings.alignment === 'center' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
          >
            <AlignCenter size={12} />
          </button>
          <button 
            onClick={() => {
              const newSettings = { ...currentComponentSettings };
              newSettings[componentId] = { ...settings, alignment: 'right' };
              onComponentSettingsChange?.(newSettings);
            }}
            className={`p-1 rounded ${settings.alignment === 'right' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
          >
            <AlignRight size={12} />
          </button>
          <div className="w-px h-3 bg-gray-200 mx-1"></div>
          <select 
            value={componentId}
            onChange={(e) => {
              const newId = e.target.value;
              const newLayout = currentLayout.map(row => ({
                ...row,
                columns: row.columns.map((col, idx) => (row.id === rowId && idx === colIdx) ? newId : col)
              }));
              onLayoutChange?.(newLayout);
            }}
            className="text-[10px] border-none bg-transparent focus:ring-0 p-0 cursor-pointer font-bold text-blue-600"
          >
            <option value="business">Cơ sở</option>
            <option value="title">Tiêu đề</option>
            <option value="date">Ngày</option>
            <option value="customer">Khách hàng</option>
            <option value="items">Hàng hóa</option>
            <option value="totals">Tổng cộng</option>
            <option value="payment">Thanh toán</option>
            <option value="notes">Ghi chú</option>
            <option value="signature">Chữ ký</option>
            <option value="empty">Trống</option>
          </select>
          <div className="w-px h-3 bg-gray-200 mx-1"></div>
          <button 
            onClick={() => {
              const newLayout = currentLayout.map(row => {
                if (row.id === rowId) {
                  const newCols = [...row.columns];
                  newCols.splice(colIdx, 1);
                  return { ...row, columns: newCols };
                }
                return row;
              }).filter(row => row.columns.length > 0);
              onLayoutChange?.(newLayout);
            }}
            className="p-1 hover:bg-red-100 rounded text-red-600"
            title="Xóa thành phần"
          >
            <X size={12} />
          </button>
        </div>
        {content}
      </div>
    );

    switch (componentId) {
      case 'business':
        const businessLogoAlignClass = 
          settings.alignment === 'center' ? 'mx-auto' : 
          settings.alignment === 'right' ? 'ml-auto' : 'mr-auto';

        const businessHeaderAlignClass = 
          settings.alignment === 'center' ? 'text-center' : 
          settings.alignment === 'right' ? 'text-right' : 'text-left';

        return componentWrapper(
          <div key="business" className={`flex justify-between items-end mb-0 ${businessHeaderAlignClass}`}>
            <div className="flex-1">
              {businessInfo.logoPosition === 'inline-left' ? (
                <div className={`flex items-center gap-4 ${settings.alignment === 'center' ? 'justify-center' : settings.alignment === 'right' ? 'justify-end' : 'justify-start'}`}>
                  {businessInfo.logo && (
                    <img 
                      src={businessInfo.logo} 
                      alt="Logo" 
                      className="object-contain" 
                      style={{ height: businessInfo.logoSize ? `${businessInfo.logoSize}px` : '64px' }}
                    />
                  )}
                  <div>
                    <h1 className="font-black text-4xl text-gray-900 uppercase tracking-tighter mb-2">{businessInfo.name}</h1>
                    <div className={`w-12 h-1 bg-red-600 mb-4 ${settings.alignment === 'center' ? 'mx-auto' : settings.alignment === 'right' ? 'ml-auto' : ''}`}></div>
                    <p className="text-gray-600">{businessInfo.address}</p>
                    <p className="text-gray-600">MST: {businessInfo.taxCode} | ĐT: {businessInfo.phone}</p>
                  </div>
                </div>
              ) : (
                <>
                  {businessInfo.logo && (
                    <img 
                      src={businessInfo.logo} 
                      alt="Logo" 
                      className={`mb-4 object-contain ${businessLogoAlignClass}`} 
                      style={{ height: businessInfo.logoSize ? `${businessInfo.logoSize}px` : '64px' }}
                    />
                  )}
                  <h1 className="font-black text-4xl text-gray-900 uppercase tracking-tighter mb-2">{businessInfo.name}</h1>
                  <div className={`w-12 h-1 bg-red-600 mb-4 ${settings.alignment === 'center' ? 'mx-auto' : settings.alignment === 'right' ? 'ml-auto' : ''}`}></div>
                  <p className="text-gray-600">{businessInfo.address}</p>
                  <p className="text-gray-600">MST: {businessInfo.taxCode} | ĐT: {businessInfo.phone}</p>
                </>
              )}
            </div>
          </div>,
          rowId, colIdx
        );
      case 'title':
        return componentWrapper(
          <div key="title">
            <h2 className="font-black text-5xl text-red-600 uppercase tracking-tighter">{isHandoverMode ? "BIÊN BẢN BÀN GIAO" : "BÁO GIÁ"}</h2>
          </div>,
          rowId, colIdx
        );
      case 'date':
        return componentWrapper(
          <div key="date">
            <div className={`flex items-center gap-2 ${settings.alignment === 'center' ? 'justify-center' : settings.alignment === 'right' ? 'justify-end' : 'justify-start'}`}>
              <span className="text-gray-400 text-xs uppercase tracking-widest">Ngày báo giá:</span>
              <input 
                type="text"
                placeholder="Nhập ngày tháng..." 
                value={quoteDate || ''} 
                onChange={(e) => onQuoteDateChange?.(e.target.value)}
                className="border-none bg-transparent font-bold focus:ring-0 p-0 w-48 text-right print:hidden"
              />
              <span className="hidden print:inline font-bold">
                {quoteDate}
              </span>
            </div>
          </div>,
          rowId, colIdx
        );
      case 'customer':
        return componentWrapper(
          <div key="customer" className="bg-gray-900 text-white p-6 mb-8 flex justify-between items-center">
            <div className={`${settings.alignment === 'center' ? 'text-center w-full' : settings.alignment === 'right' ? 'text-right w-full' : 'text-left'}`}>
              <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Khách hàng</p>
              <p className="font-bold text-xl uppercase">{customerName}</p>
              {data.customerAddress && <p className="text-gray-300 text-sm mt-1">{data.customerAddress}</p>}
            </div>
          </div>,
          rowId, colIdx
        );
      case 'items':
        return componentWrapper(
          <div key="items" className="mb-8 text-left">
            <table className="w-full mb-8 table-fixed">
              <thead>
                <tr className="border-b-2 border-gray-900 text-gray-900">
                  <th className="py-3 text-center font-bold" style={{ width: `${columnWidths?.stt || 5}%` }}>STT</th>
                  {businessInfo.showItemImages && <th className="py-3 text-center w-20 font-bold">HÌNH</th>}
                  <th className="py-3 text-left font-bold" style={{ width: `${columnWidths?.name || 40}%` }}>SẢN PHẨM / DỊCH VỤ</th>
                  <th className="py-3 text-center font-bold" style={{ width: `${columnWidths?.unit || 10}%` }}>ĐVT</th>
                  <th className="py-3 text-center font-bold" style={{ width: `${columnWidths?.quantity || 10}%` }}>SL</th>
                  {!isHandoverMode && (
                    <>
                      <th className="py-3 text-right font-bold" style={{ width: `${columnWidths?.price || 15}%` }}>ĐƠN GIÁ</th>
                  <th className="py-3 text-right font-bold" style={{ width: `${columnWidths?.amount || 20}%` }}>THÀNH TIỀN</th>
                    </>
                  )}
                </tr>
              </thead>
              <Reorder.Group as="tbody" axis="y" values={items} onReorder={(newItems) => onReorder?.(newItems)}>
                {items.map((item, index) => {
                  const amount = item.quantity * item.price;
                  if (item.isTextOnly) {
                    return (
                      <Reorder.Item 
                        key={item.id} 
                        value={item} 
                        as="tr" 
                        className="group/row cursor-default bg-white"
                      >
                        <td colSpan={isHandoverMode ? (businessInfo.showItemImages ? 5 : 4) : (businessInfo.showItemImages ? 7 : 6)} className="border border-black p-2 relative">
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
                      className="border-b border-gray-200 group/row cursor-default bg-white"
                    >
                      <td className="py-4 text-center font-medium relative">
                        {index + 1}
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-0 group-hover/row:opacity-100 transition-opacity print:hidden cursor-grab active:cursor-grabbing p-1 bg-blue-50 rounded border border-blue-200 -left-4">
                          <GripVertical size={14} className="text-blue-500" />
                        </div>
                      </td>
                      {businessInfo.showItemImages && (
                        <td className="py-4 text-center">
                          {item.image && <img src={item.image} alt={item.name} className="w-12 h-12 object-cover mx-auto border border-gray-200 p-0.5" />}
                        </td>
                      )}
                      <td className="py-4">
                        <p className="font-bold text-gray-900 whitespace-pre-wrap">{item.name}</p>
                        {item.note && <p className="text-sm text-gray-500 mt-0.5">{item.note}</p>}
                      </td>
                      <td className="py-4 text-center text-gray-600">{item.unit}</td>
                      <td className="py-4 text-center font-medium">{item.quantity || ''}</td>
                      {!isHandoverMode && (
                        <>
                          <td className="py-4 text-right text-gray-600">{formatCurrency(item.price)}</td>
                      <td className="py-4 text-right font-bold text-gray-900">{formatCurrency(amount)}</td>
                        </>
                      )}
                    </Reorder.Item>
                  );
                })}
              </Reorder.Group>
            </table>
          </div>,
          rowId, colIdx
        );
      case 'totals':
        if (isHandoverMode) return null;
        return componentWrapper(
          <div key="totals" className={`flex ${settings.alignment === 'center' ? 'justify-center' : settings.alignment === 'left' ? 'justify-start' : 'justify-end'}`}>
            <div className="w-full max-w-md bg-red-50 p-6 border-l-4 border-red-600">
              <div className="flex justify-between mb-2 text-red-800">
                <span className="font-medium">Cộng tiền hàng:</span>
                <span>{formatCurrency(data.subtotal)}</span>
              </div>
              <div className="flex justify-between mb-4 text-red-800 border-b border-red-200 pb-2">
                <span className="font-medium">Thuế VAT {data.isVatIncluded ? '' : `(${data.vatRate}%):`}</span>
                <span>{data.isVatIncluded ? 'Đã bao gồm' : formatCurrency(data.subtotal * (data.vatRate / 100))}</span>
              </div>
              <p className="text-sm text-red-800 font-bold uppercase mb-1">Tổng thanh toán</p>
              <p className="text-3xl font-black text-red-600">{formatCurrency(data.total)} <span className="text-lg">VNĐ</span></p>
            </div>
          </div>,
          rowId, colIdx
        );
      case 'payment':
        return componentWrapper(
          <div key="payment" className={`${settings.alignment === 'center' ? 'text-center' : settings.alignment === 'right' ? 'text-right' : 'text-left'}`}>
            <h3 className="font-bold text-gray-900 uppercase mb-3 text-sm tracking-wider">Thông tin thanh toán</h3>
            {businessInfo.showPaymentInfo && (
              <div className="mb-2">
                {businessInfo.paymentInfo ? (
                  <div className="whitespace-pre-wrap text-gray-600 text-sm">{businessInfo.paymentInfo}</div>
                ) : (
                  <p className="text-gray-600 text-sm mb-1">Phương thức: Tiền mặt / Chuyển khoản</p>
                )}
              </div>
            )}
          </div>,
          rowId, colIdx
        );
      case 'notes':
        return componentWrapper(
          <div key="notes" className={`${settings.alignment === 'center' ? 'text-center' : settings.alignment === 'right' ? 'text-right' : 'text-left'}`}>
            <h3 className="font-bold text-gray-900 uppercase mb-3 text-sm tracking-wider">Ghi chú</h3>
            {businessInfo.showNotes && (
              <div>
                {businessInfo.notes ? (
                  <div className="whitespace-pre-wrap text-gray-600 text-sm">{businessInfo.notes}</div>
                ) : (
                  <p className="text-gray-600 text-sm mb-1">Hiệu lực: 30 ngày kể từ ngày báo giá</p>
                )}
              </div>
            )}
          </div>,
          rowId, colIdx
        );
      case 'signature':
        return componentWrapper(
          <div key="signature" className={`flex ${isHandoverMode ? 'justify-between' : 'justify-end'} w-full mt-8`}>
            {isHandoverMode && (
              <div className="text-center w-64">
                <p className="font-bold mb-0">ĐẠI DIỆN BÊN B (BÊN NHẬN)</p>
                {customerRepresentative && <p className="italic text-sm">{customerRepresentative}</p>}
                <div style={{ height: '96px' }}></div>
              </div>
            )}
            <div className="text-center w-64">
              <p className="font-bold mb-0">{isHandoverMode ? 'ĐẠI DIỆN BÊN A (BÊN GIAO)' : 'Đại diện đơn vị cung cấp'}</p>
              {businessInfo.representativeName && isHandoverMode && <p className="italic text-sm">{businessInfo.representativeName}</p>}
              {businessInfo.signature ? (
                <img 
                  src={businessInfo.signature} 
                  alt="Signature" 
                  className="mx-auto object-contain" 
                  style={{ height: businessInfo.signatureSize ? `${businessInfo.signatureSize}px` : '96px' }}
                />
              ) : (
                <div style={{ height: businessInfo.signatureSize ? `${businessInfo.signatureSize}px` : '96px' }}></div>
              )}
            </div>
          </div>,
          rowId, colIdx
        );
      case 'empty': {
        const emptyKey = `empty-${rowId}-${colIdx}`;
        const emptySettings = currentComponentSettings[emptyKey] || {};
        return componentWrapper(
          <div key="empty" className="w-full">
            <textarea
              value={emptySettings.text || ''}
              onChange={(e) => onComponentSettingsChange?.({ ...currentComponentSettings, [emptyKey]: { ...emptySettings, text: e.target.value } })}
              placeholder="Nhập nội dung tự do..."
              className="w-full bg-transparent border border-dashed border-gray-300 print:border-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none overflow-hidden min-h-[2rem] p-1 rounded"
              onInput={(e) => {
                const target = e.target;
                target.style.height = 'auto';
                target.style.height = target.scrollHeight + 'px';
              }}
            />
          </div>,
          rowId, colIdx
        );
      }
      default:
        return null;
    }
  };

  const renderRow = (row: LayoutRow) => {
    const columns = row.columns.length;
    const gridClass = columns > 1 ? `grid grid-cols-${columns} gap-4` : '';

    return (
      <div className="relative group/row-layout focus:outline-none" tabIndex={0}>
        <div className="absolute -left-32 top-0 flex flex-col gap-1 opacity-0 group-hover/row-layout:opacity-100 group-focus-within/row-layout:opacity-100 group-focus/row-layout:opacity-100 transition-opacity print:hidden z-20">
          <div className="cursor-grab active:cursor-grabbing p-1 bg-gray-100 rounded border border-gray-300 hover:bg-gray-200 flex justify-center" title="Di chuyển dòng">
            <MoveVertical size={16} className="text-gray-500" />
          </div>
          <div className="flex bg-white border rounded shadow-sm p-1 gap-1 items-center">
            <div className="flex flex-col gap-1">
              <button 
                onClick={() => {
                  const newLayout = currentLayout.map(r => r.id === row.id ? { ...r, columns: [...r.columns, 'empty'] } : r);
                  onLayoutChange?.(newLayout);
                }}
                className="p-1 hover:bg-gray-100 rounded text-blue-600"
                title="Thêm cột"
              >
                <Plus size={14} />
              </button>
              <div className="text-[10px] font-bold text-center text-gray-400">{columns}</div>
              <button 
                onClick={() => {
                  if (columns > 1) {
                    const newLayout = currentLayout.map(r => r.id === row.id ? { ...r, columns: r.columns.slice(0, -1) } : r);
                    onLayoutChange?.(newLayout);
                  }
                }}
                className="p-1 hover:bg-gray-100 rounded text-red-600"
                title="Bớt cột"
              >
                <Minus size={14} />
              </button>
            </div>
            <div className="w-px h-10 bg-gray-200 mx-1"></div>
            <div className="flex flex-col items-center gap-1 group/spacing relative focus:outline-none" tabIndex={0}>
              <Settings size={18} className="text-gray-500 pointer-events-none" />
              <div className="absolute right-full mr-2 top-0 bg-white border rounded shadow-lg p-3 hidden group-hover/spacing:block group-focus-within/spacing:block group-focus/spacing:block z-50 w-48 cursor-default" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase mb-2">
                  <span>Giãn cách phần</span>
                  <span>{row.spacing}px</span>
                </div>
                <input 
                  type="range" 
                  min="-50" 
                  max="100" 
                  value={row.spacing} 
                  onChange={(e) => {
                    const newLayout = currentLayout.map(r => r.id === row.id ? { ...r, spacing: parseInt(e.target.value) } : r);
                    onLayoutChange?.(newLayout);
                  }}
                  className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            </div>
          </div>
        </div>
        <Reorder.Group 
          axis="x" 
          values={row.columns} 
          onReorder={(newCols) => {
            const newLayout = currentLayout.map(r => r.id === row.id ? { ...r, columns: newCols } : r);
            onLayoutChange?.(newLayout);
          }}
          className={gridClass}
        >
          {row.columns.map((compId, idx) => (
            <Reorder.Item key={`${row.id}-col-${idx}-${compId}`} value={compId} className="flex-1">
              {renderComponent(compId, row.id, idx)}
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
    );
  };

  const marginStyle = margins ? {
    paddingTop: `${margins.top}mm`,
    paddingRight: `${margins.right}mm`,
    paddingBottom: `${margins.bottom}mm`,
    paddingLeft: `${margins.left}mm`,
  } : { padding: '15mm' };

  return (
    <div 
      className={`bg-white shadow-2xl ${containerStyle} font-sans text-[14px] leading-relaxed print:shadow-none print:w-full print:min-h-0 print:p-0 relative group/template`}
      style={marginStyle}
    >
      {/* Interactive controls overlay (hidden when printing) */}
      {/* Decorative Header Block */}
      <div className="absolute top-0 left-0 w-full h-8 bg-red-600"></div>
      
      <Reorder.Group axis="y" values={currentLayout} onReorder={(newLayout) => onLayoutChange?.(newLayout)}>
        {currentLayout.map((row) => (
          <Reorder.Item 
            key={row.id} 
            value={row} 
            style={{ marginBottom: `${row.spacing}px` }}
            className="bg-white"
          >
            {renderRow(row)}
          </Reorder.Item>
        ))}
      </Reorder.Group>

      <div className="mt-8 pt-4 border-t border-dashed border-gray-200 print:hidden">
        <button 
          onClick={() => {
            const newRow: LayoutRow = {
              id: `row-${Date.now()}`,
              columns: ['empty'],
              spacing: 20
            };
            onLayoutChange?.([...currentLayout, newRow]);
          }}
          className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-400 hover:text-blue-500 hover:border-blue-300 transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={16} /> Thêm dòng mới
        </button>
      </div>
    </div>
  );
};

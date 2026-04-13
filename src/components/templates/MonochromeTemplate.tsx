import React from 'react';
import { TemplateProps, Item, LayoutRow } from '../../types';
import { Reorder } from 'motion/react';
import { GripVertical, MoveVertical, Plus, Minus, AlignLeft, AlignCenter, AlignRight, Settings, X, GripHorizontal } from 'lucide-react';

const formatCurrency = (amount: number) => {
  if (!amount) return '-';
  return new Intl.NumberFormat('vi-VN').format(amount);
};

export const MonochromeTemplate: React.FC<TemplateProps> = ({ 
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
            className={`p-1 rounded ${settings.alignment === 'left' ? 'bg-blue-100 text-gray-900' : 'hover:bg-gray-100'}`}
          >
            <AlignLeft size={12} />
          </button>
          <button 
            onClick={() => {
              const newSettings = { ...currentComponentSettings };
              newSettings[componentId] = { ...settings, alignment: 'center' };
              onComponentSettingsChange?.(newSettings);
            }}
            className={`p-1 rounded ${settings.alignment === 'center' ? 'bg-blue-100 text-gray-900' : 'hover:bg-gray-100'}`}
          >
            <AlignCenter size={12} />
          </button>
          <button 
            onClick={() => {
              const newSettings = { ...currentComponentSettings };
              newSettings[componentId] = { ...settings, alignment: 'right' };
              onComponentSettingsChange?.(newSettings);
            }}
            className={`p-1 rounded ${settings.alignment === 'right' ? 'bg-blue-100 text-gray-900' : 'hover:bg-gray-100'}`}
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
            className="text-[10px] border-none bg-transparent focus:ring-0 p-0 cursor-pointer font-bold text-gray-900"
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
                  newCols[colIdx] = 'empty';
                  return { ...row, columns: newCols };
                }
                return row;
              });
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
          <div key="business" className={`flex justify-between items-start mb-0 border-b-2 border-blue-600 pb-6 ${businessHeaderAlignClass}`}>
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
                    <h1 className="font-bold text-3xl text-gray-900 uppercase mb-2">{businessInfo.name}</h1>
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
                      className={`object-contain mb-2 ${businessLogoAlignClass}`} 
                      style={{ height: businessInfo.logoSize ? `${businessInfo.logoSize}px` : '64px' }}
                    />
                  )}
                  <div>
                    <h1 className="font-bold text-3xl text-gray-900 uppercase mb-2">{businessInfo.name}</h1>
                    <p className="text-gray-600">{businessInfo.address}</p>
                    <p className="text-gray-600">MST: {businessInfo.taxCode} | ĐT: {businessInfo.phone}</p>
                  </div>
                </>
              )}
            </div>
          </div>,
          rowId, colIdx
        );
      case 'title':
        return componentWrapper(
          <div key="title">
            <h2 className="font-mono text-4xl text-black uppercase border-4 border-black p-2 inline-block text-gray-200 uppercase tracking-wider">{isHandoverMode ? "BIÊN BẢN BÀN GIAO" : "BÁO GIÁ"}</h2>
          </div>,
          rowId, colIdx
        );
      case 'date':
        return componentWrapper(
          <div key="date">
            <div className={`flex items-center gap-2 ${settings.alignment === 'center' ? 'justify-center' : settings.alignment === 'right' ? 'justify-end' : 'justify-start'}`}>
              <span className="text-gray-500">Ngày:</span>
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
          </div>,
          rowId, colIdx
        );
      case 'customer':
        return componentWrapper(
          <div key="customer" className="bg-white border-2 border-black p-4 rounded-none border border-blue-100">
            <p className="text-sm text-gray-900 font-semibold mb-1">KÍNH GỬI:</p>
            <p className="font-bold text-lg text-gray-800 uppercase">{customerName}</p>
            {data.customerAddress && <p className="text-gray-700 mt-1">{data.customerAddress}</p>}
          </div>,
          rowId, colIdx
        );
      case 'items':
        return componentWrapper(
          <div key="items" className="mb-6 text-left">
            <table className="w-full table-fixed">
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="p-3 text-center rounded-none" style={{ width: `${columnWidths?.stt || 5}%` }}>STT</th>
                  {businessInfo.showItemImages && <th className="p-3 text-center w-20">Hình ảnh</th>}
                  <th className="p-3 text-left" style={{ width: `${columnWidths?.name || 40}%` }}>Tên hàng hóa / Dịch vụ</th>
                  <th className="p-3 text-center" style={{ width: `${columnWidths?.unit || 10}%` }}>ĐVT</th>
                  <th className="p-3 text-center" style={{ width: `${columnWidths?.quantity || 10}%` }}>SL</th>
                  {!isHandoverMode && (
                    <>
                      <th className="p-3 text-right" style={{ width: `${columnWidths?.price || 15}%` }}>Đơn giá</th>
                  <th className="p-3 text-right" style={{ width: `${columnWidths?.amount || 20}%` }}>Thành tiền</th>
                    </>
                  )}
                  <th className="p-3 text-left w-24 rounded-none">Ghi chú</th>
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
                        className="group/row cursor-default bg-white border-b border-black"
                      >
                        <td colSpan={isHandoverMode ? (businessInfo.showItemImages ? 5 : 4) : (businessInfo.showItemImages ? 7 : 6)} className="p-3 relative">
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-0 group-hover/row:opacity-100 transition-opacity print:hidden cursor-grab active:cursor-grabbing p-1 bg-white border-2 border-black rounded border border-gray-300 -left-6">
                            <GripVertical size={14} className="text-gray-500" />
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
                      className="border-b border-black hover:bg-white border-2 border-black group/row cursor-default bg-white"
                    >
                      <td className="p-3 text-center text-gray-500 relative">
                        {index + 1}
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-0 group-hover/row:opacity-100 transition-opacity print:hidden cursor-grab active:cursor-grabbing p-1 bg-white border-2 border-black rounded border border-gray-300 -left-4">
                          <GripVertical size={14} className="text-gray-500" />
                        </div>
                      </td>
                      {businessInfo.showItemImages && (
                        <td className="p-3 text-center">
                          {item.image && <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded mx-auto shadow-sm" />}
                        </td>
                      )}
                      <td className="p-3 font-medium text-gray-800 whitespace-pre-wrap">{item.name}</td>
                      <td className="p-3 text-center text-gray-600">{item.unit}</td>
                      <td className="p-3 text-center text-gray-600">{item.quantity || ''}</td>
                      {!isHandoverMode && (
                        <>
                          <td className="p-3 text-right text-gray-600">{formatCurrency(item.price)}</td>
                      <td className="p-3 text-right font-semibold text-gray-900">{formatCurrency(amount)}</td>
                        </>
                      )}
                      <td className="p-3 text-sm text-gray-500">{item.note}</td>
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
            <div className="w-full max-w-md bg-white border-2 border-black p-4 rounded-none border border-black space-y-2">
              <div className="flex justify-between items-center text-gray-600">
                <span>Cộng tiền hàng:</span>
                <span className="font-medium">{formatCurrency(data.subtotal)} VNĐ</span>
              </div>
              <div className="flex justify-between items-center text-gray-600 border-b border-black pb-2">
                <span>Thuế VAT {data.isVatIncluded ? '' : `(${data.vatRate}%):`}</span>
                <span className="font-medium">{data.isVatIncluded ? 'Đã bao gồm' : `${formatCurrency(data.subtotal * (data.vatRate / 100))} VNĐ`}</span>
              </div>
              <div className="flex justify-between items-center font-bold text-xl text-gray-800 pt-2">
                <span>TỔNG CỘNG:</span>
                <span className="text-gray-900">{formatCurrency(data.total)} VNĐ</span>
              </div>
            </div>
          </div>,
          rowId, colIdx
        );
      case 'payment':
        return componentWrapper(
          <div key="payment" className={`text-sm text-gray-600 ${settings.alignment === 'center' ? 'text-center' : settings.alignment === 'right' ? 'text-right' : 'text-left'}`}>
            <h3 className="font-bold text-gray-800 mb-2">Thông tin thanh toán</h3>
            {businessInfo.showPaymentInfo && (
              <div className="mb-2">
                {businessInfo.paymentInfo ? (
                  <div className="whitespace-pre-wrap">{businessInfo.paymentInfo}</div>
                ) : (
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Phương thức thanh toán: Tiền mặt / Chuyển khoản</li>
                  </ul>
                )}
              </div>
            )}
          </div>,
          rowId, colIdx
        );
      case 'notes':
        return componentWrapper(
          <div key="notes" className={`text-sm text-gray-600 ${settings.alignment === 'center' ? 'text-center' : settings.alignment === 'right' ? 'text-right' : 'text-left'}`}>
            <h3 className="font-bold text-gray-800 mb-2">Ghi chú</h3>
            {businessInfo.showNotes && (
              <div>
                {businessInfo.notes ? (
                  <div className="whitespace-pre-wrap">{businessInfo.notes}</div>
                ) : (
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Báo giá có hiệu lực trong vòng 30 ngày</li>
                  </ul>
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
          <div className="flex bg-white border rounded shadow-sm p-1 gap-1 items-center relative">
            <div className="flex flex-col gap-1">
              <button 
                onClick={() => {
                  const newLayout = currentLayout.map(r => r.id === row.id ? { ...r, columns: [...r.columns, 'empty'] } : r);
                  onLayoutChange?.(newLayout);
                }}
                className="p-1 hover:bg-gray-100 rounded text-gray-900"
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
            <div className="flex flex-col items-center gap-1 group/spacing focus:outline-none relative" tabIndex={0}>
              <Settings size={18} className="text-gray-500 pointer-events-none" />
              <div 
                className="absolute right-full mr-2 top-0 bg-white border rounded shadow-lg p-3 hidden group-hover/spacing:block group-focus-within/spacing:block group-focus/spacing:block z-50 w-48 cursor-default" 
                onClick={e => e.stopPropagation()}
              >
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
                  className="w-full h-1 bg-gray-200 rounded-none appearance-none cursor-pointer accent-blue-600"
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

      <div className="mt-8 pt-4 border-t border-dashed border-black print:hidden">
        <button 
          onClick={() => {
            const newRow: LayoutRow = {
              id: `row-${Date.now()}`,
              columns: ['empty'],
              spacing: 20
            };
            onLayoutChange?.([...currentLayout, newRow]);
          }}
          className="w-full py-2 border-2 border-dashed border-gray-300 rounded-none text-gray-400 hover:text-gray-500 hover:border-blue-300 transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={16} /> Thêm dòng mới
        </button>
      </div>
    </div>
  );
};

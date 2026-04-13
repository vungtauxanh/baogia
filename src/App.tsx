import React, { useState, useRef, useEffect } from 'react';
import { Plus, Trash2, Printer, Settings2, FileText, Image as ImageIcon, LayoutTemplate, FileDown, Table, Upload, Save, FolderOpen, Type, X } from 'lucide-react';
import * as XLSX from 'xlsx';
import { Item, BusinessInfo, QuotationData, BusinessProfile, LayoutRow, ComponentSettings } from './types';
import { ClassicTemplate } from './components/templates/ClassicTemplate';
import { ModernTemplate } from './components/templates/ModernTemplate';
import { MinimalistTemplate } from './components/templates/MinimalistTemplate';
import { BoldTemplate } from './components/templates/BoldTemplate';
import { CorporateTemplate } from './components/templates/CorporateTemplate';
import { CreativeTemplate } from './components/templates/CreativeTemplate';
import { ElegantTemplate } from './components/templates/ElegantTemplate';
import { TechTemplate } from './components/templates/TechTemplate';
import { NatureTemplate } from './components/templates/NatureTemplate';
import { CompactTemplate } from './components/templates/CompactTemplate';
import { PremiumTemplate } from './components/templates/PremiumTemplate';
import { StartupTemplate } from './components/templates/StartupTemplate';
import { VintageTemplate } from './components/templates/VintageTemplate';
import { NeonTemplate } from './components/templates/NeonTemplate';
import { OceanTemplate } from './components/templates/OceanTemplate';
import { MonochromeTemplate } from './components/templates/MonochromeTemplate';
import { DraggablePanel } from './components/DraggablePanel';
import { WysiwygToolbar } from './components/WysiwygToolbar';

const TEMPLATES = [
  { id: 'classic', name: 'Truyền thống (A4)', component: ClassicTemplate },
  { id: 'modern', name: 'Hiện đại (Xanh)', component: ModernTemplate },
  { id: 'minimalist', name: 'Tối giản (Thanh lịch)', component: MinimalistTemplate },
  { id: 'bold', name: 'Mạnh mẽ (Đỏ)', component: BoldTemplate },
  { id: 'corporate', name: 'Doanh nghiệp (Đen/Xám)', component: CorporateTemplate },
  { id: 'creative', name: 'Sáng tạo (Gradient)', component: CreativeTemplate },
  { id: 'elegant', name: 'Thanh lịch (Vàng đồng)', component: ElegantTemplate },
  { id: 'tech', name: 'Công nghệ (Xanh/Cyan)', component: TechTemplate },
  { id: 'nature', name: 'Thiên nhiên (Xanh lá)', component: NatureTemplate },
  { id: 'compact', name: 'Nhỏ gọn (Tiết kiệm giấy)', component: CompactTemplate },
  { id: 'premium', name: 'Cao cấp (Đen/Vàng)', component: PremiumTemplate },
  { id: 'startup', name: 'Khởi nghiệp (Tím/Hồng)', component: StartupTemplate },
  { id: 'vintage', name: 'Cổ điển (Nâu/Vàng)', component: VintageTemplate },
  { id: 'neon', name: 'Neon (Hồng/Tím Đậm)', component: NeonTemplate },
  { id: 'ocean', name: 'Đại dương (Xanh Cyan)', component: OceanTemplate },
  { id: 'monochrome', name: 'Đơn sắc (Đen/Trắng)', component: MonochromeTemplate },
];

const DEFAULT_PROFILES: BusinessProfile[] = [
  {
    id: 'default-thuy-hien',
    profileName: 'THỦY HIÊN',
    data: {
      name: 'Cơ sở kinh doanh THỦY HIÊN',
      address: '32/12 Đường DC6, Phường Tây Thạnh, TP. HCM',
      taxCode: '070187006522',
      phone: '0909790778',
      logo: '',
      logoSize: 80,
      logoPosition: 'center',
      signature: '',
      signatureSize: 120,
      paymentInfo: 'Ngân hàng: ...\nSố tài khoản: ...\nChủ tài khoản: ...',
      showPaymentInfo: true,
      notes: 'Báo giá có hiệu lực trong vòng 30 ngày.',
      showNotes: true,
      showItemImages: true
    }
  },
  {
    id: 'default-quang-bich',
    profileName: 'QUANG BÍCH',
    data: {
      name: 'HỘ KINH DOANH ĐINH QUANG BÍCH – CHI NHÁNH 1',
      address: '330 đường Hùng Vương, Xã Hàm Tân, Tỉnh Lâm Đồng, Việt Nam',
      taxCode: '060200004010',
      phone: '0394.012345',
      logo: '',
      logoSize: 80,
      logoPosition: 'center',
      signature: '',
      signatureSize: 120,
      paymentInfo: 'Tài khoản: 6460235002068\nMở tại: AGRIBANK – CN TẤN PHÚ',
      showPaymentInfo: true,
      notes: 'Báo giá có hiệu lực trong vòng 30 ngày.',
      showNotes: true,
      showItemImages: true
    }
  },
  {
    id: 'default-sac-mau',
    profileName: 'SẮC MÀU',
    data: {
      name: 'HỘ KINH DOANH SẮC MÀU',
      address: '229 Ba Cu, Phường Vũng Tàu, Tp. HCM',
      taxCode: '3500693069',
      phone: '0989619489',
      logo: '',
      logoSize: 80,
      logoPosition: 'center',
      signature: '',
      signatureSize: 120,
      paymentInfo: 'Ngân hàng: ...\nSố tài khoản: ...\nChủ tài khoản: ...',
      showPaymentInfo: true,
      notes: 'Báo giá có hiệu lực trong vòng 30 ngày.',
      showNotes: true,
      showItemImages: true
    }
  },
  {
    id: 'default-kim-anh',
    profileName: 'KIM ANH',
    data: {
      name: 'HKD PHẠM THỊ KIM ANH',
      address: 'Thôn 2, Xã Hàm Tân, Tỉnh Lâm Đồng, Việt Nam',
      taxCode: '051169007569',
      phone: '0945196932',
      logo: '',
      logoSize: 80,
      logoPosition: 'center',
      signature: '',
      signatureSize: 120,
      paymentInfo: 'Ngân hàng: ...\nSố tài khoản: ...\nChủ tài khoản: ...',
      showPaymentInfo: true,
      notes: 'Báo giá có hiệu lực trong vòng 30 ngày.',
      showNotes: true,
      showItemImages: true
    }
  },
  {
    id: 'default-kab',
    profileName: 'KAB',
    data: {
      name: 'CÔNG TY TNHH XUẤT NHẬP KHẨU KAB',
      address: '182/8/26 Đường 26/3, Phường Bình Hưng Hòa, TP Hồ Chí Minh',
      taxCode: '0315249470',
      phone: '0911922179',
      logo: '',
      logoSize: 80,
      logoPosition: 'center',
      signature: '',
      signatureSize: 120,
      paymentInfo: 'Ngân hàng: ...\nSố tài khoản: ...\nChủ tài khoản: ...',
      showPaymentInfo: true,
      notes: 'Báo giá có hiệu lực trong vòng 30 ngày.',
      showNotes: true,
      showItemImages: true
    }
  }
];

export default function App() {
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>(DEFAULT_PROFILES[0].data);

  const [businessProfiles, setBusinessProfiles] = useState<BusinessProfile[]>(() => {
    const saved = localStorage.getItem('businessProfiles');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.length > 0) return parsed;
      } catch (e) {
        return DEFAULT_PROFILES;
      }
    }
    return DEFAULT_PROFILES;
  });

  const [profileNameInput, setProfileNameInput] = useState('');

  const saveBusinessProfile = () => {
    if (!profileNameInput.trim()) {
      alert('Vui lòng nhập tên cấu hình!');
      return;
    }
    const newProfile: BusinessProfile = {
      id: Date.now().toString(),
      profileName: profileNameInput.trim(),
      data: { ...businessInfo }
    };
    const updatedProfiles = [...businessProfiles, newProfile];
    setBusinessProfiles(updatedProfiles);
    localStorage.setItem('businessProfiles', JSON.stringify(updatedProfiles));
    setProfileNameInput('');
    alert('Đã lưu cấu hình thành công!');
  };

  const loadBusinessProfile = (id: string) => {
    const profile = businessProfiles.find(p => p.id === id);
    if (profile) {
      setBusinessInfo(profile.data);
    }
  };

  const deleteBusinessProfile = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa cấu hình này?')) {
      const updatedProfiles = businessProfiles.filter(p => p.id !== id);
      setBusinessProfiles(updatedProfiles);
      localStorage.setItem('businessProfiles', JSON.stringify(updatedProfiles));
    }
  };

  const [customerName, setCustomerName] = useState('CÔNG AN XÃ SƠN MỸ');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerRepresentative, setCustomerRepresentative] = useState('');
  const [customerPosition, setCustomerPosition] = useState('');
  const [isHandoverMode, setIsHandoverMode] = useState(false);
  const [quoteDate, setQuoteDate] = useState('');
  
  const [items, setItems] = useState<Item[]>([
    { id: '1', name: '', unit: '', quantity: 0, price: 0, note: '' },
    { id: '2', name: '', unit: '', quantity: 0, price: 0, note: '' },
    { id: '3', name: '', unit: '', quantity: 0, price: 0, note: '' },
  ]);

  const [showSettings, setShowSettings] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState('classic');
  const [isExporting, setIsExporting] = useState(false);
  const [vatOption, setVatOption] = useState<string>('included');
  const [customVatRate, setCustomVatRate] = useState<number>(0);
  const [showPrintWarning, setShowPrintWarning] = useState(false);
  const [printOrientation, setPrintOrientation] = useState<'portrait' | 'landscape' | 'fix'>('portrait');
  const [paperSize, setPaperSize] = useState<string>('A4');
  const [rowSpacing, setRowSpacing] = useState<number>(10);
  const [printScale, setPrintScale] = useState<number>(100);
  const [margins, setMargins] = useState({ top: 15, right: 15, bottom: 15, left: 15 });
  const [sectionOrder, setSectionOrder] = useState(['business', 'title', 'date', 'customer', 'items', 'footer']);
  const [sectionSpacing, setSectionSpacing] = useState(20);
  const [sectionColumns, setSectionColumns] = useState<Record<string, number>>({});
  const [activeRowId, setActiveRowId] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isGlobalSettingsOpen, setIsGlobalSettingsOpen] = useState(true);
  const [isTemplateSelectionOpen, setIsTemplateSelectionOpen] = useState(true);
  const [currentView, setCurrentView] = useState<'editor' | 'management'>('editor');
  const [currentDocumentId, setCurrentDocumentId] = useState<string | null>(null);
  const [savedDocuments, setSavedDocuments] = useState<SavedDocument[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [saveFolderId, setSaveFolderId] = useState<string | null>(null);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [fontFamily, setFontFamily] = useState('Inter');
  const [layout, setLayout] = useState<LayoutRow[]>([
    { id: 'row1', columns: ['business'], spacing: 20 },
    { id: 'row2', columns: ['title'], spacing: 10 },
    { id: 'row3', columns: ['date'], spacing: 10 },
    { id: 'row4', columns: ['customer'], spacing: 20 },
    { id: 'row5', columns: ['items'], spacing: 20 },
    { id: 'row6', columns: ['totals'], spacing: 20 },
    { id: 'row7', columns: ['payment', 'notes'], spacing: 20 },
    { id: 'row8', columns: ['signature'], spacing: 20 }
  ]);
  const [componentSettings, setComponentSettings] = useState<Record<string, ComponentSettings>>({
    business: { alignment: 'left' },
    title: { alignment: 'center' },
    date: { alignment: 'right' },
    customer: { alignment: 'left' },
    items: { alignment: 'left' },
    totals: { alignment: 'right' },
    payment: { alignment: 'left' },
    notes: { alignment: 'left' },
    signature: { alignment: 'right' }
  });
  const [columnWidths, setColumnWidths] = useState({
    stt: 5,
    name: 40,
    unit: 10,
    quantity: 10,
    price: 15,
    amount: 20
  });

  const [isCompetitiveMode, setIsCompetitiveMode] = useState(false);
  const [competitiveRate, setCompetitiveRate] = useState(2);
  const [competitiveDirection, setCompetitiveDirection] = useState<'increase' | 'decrease'>('decrease');
  const [competitiveSupplierId, setCompetitiveSupplierId] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number | ''>('');
  
  const excelFileInputRef = useRef<HTMLInputElement>(null);

  const handleImportExcel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target?.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 }) as any[][];

      if (data.length > 0) {
        // Find headers
        const headers = data[0].map(h => String(h).toLowerCase());
        const nameIdx = headers.findIndex(h => h.includes('tên') || h.includes('hàng') || h.includes('sản phẩm') || h.includes('nội dung'));
        const unitIdx = headers.findIndex(h => h.includes('đvt') || h.includes('đơn vị'));
        const qtyIdx = headers.findIndex(h => h.includes('sl') || h.includes('số lượng'));
        const priceIdx = headers.findIndex(h => h.includes('giá') || h.includes('đơn giá'));
        const noteIdx = headers.findIndex(h => h.includes('ghi chú'));

        const newItems: Item[] = [];
        for (let i = 1; i < data.length; i++) {
          const row = data[i];
          if (!row || row.length === 0 || (!row[nameIdx >= 0 ? nameIdx : 0] && !row[priceIdx >= 0 ? priceIdx : 3])) continue;

          newItems.push({
            id: Date.now().toString() + i,
            name: row[nameIdx >= 0 ? nameIdx : 0] || '',
            unit: row[unitIdx >= 0 ? unitIdx : 1] || '',
            quantity: parseFloat(row[qtyIdx >= 0 ? qtyIdx : 2]) || 0,
            price: parseFloat(row[priceIdx >= 0 ? priceIdx : 3]) || 0,
            note: row[noteIdx >= 0 ? noteIdx : 4] || ''
          });
        }

        if (newItems.length > 0) {
          setItems(prev => [...prev, ...newItems]);
        }
      }
    };
    reader.readAsBinaryString(file);
    if (excelFileInputRef.current) excelFileInputRef.current.value = '';
  };

  const applyCompetitiveQuote = () => {
    if (!competitiveSupplierId) {
      alert('Vui lòng chọn Đơn vị cung cấp mới!');
      return;
    }

    const supplier = businessProfiles.find(p => p.id === competitiveSupplierId);
    if (supplier) {
      setBusinessInfo(supplier.data);
    }

    const multiplier = competitiveDirection === 'increase' ? 1 + (competitiveRate / 100) : 1 - (competitiveRate / 100);
    const newItems = items.map(item => ({
      ...item,
      price: Math.round(item.price * multiplier)
    }));
    setItems(newItems);
    alert(`Đã áp dụng báo giá cạnh tranh (${competitiveDirection === 'increase' ? '+' : '-'}${competitiveRate}%) và đổi đơn vị cung cấp.`);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('savedDocuments');
    if (saved) {
      try {
        setSavedDocuments(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved documents', e);
      }
    }
    const savedFolders = localStorage.getItem('folders');
    if (savedFolders) {
      try {
        setFolders(JSON.parse(savedFolders));
      } catch (e) {
        console.error('Failed to parse folders', e);
      }
    }
  }, []);

  const handleSaveData = () => {
    const dataToSave = {
      businessInfo,
      customerName,
      customerAddress,
      customerRepresentative,
      customerPosition,
      isHandoverMode,
      quoteDate,
      items,
      vatOption,
      customVatRate,
      selectedTemplateId,
      columnWidths,
      sectionColumns,
      layout,
      componentSettings
    };
    const blob = new Blob([JSON.stringify(dataToSave, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `du-lieu-bao-gia-${new Date().getTime()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLoadData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.businessInfo) setBusinessInfo(data.businessInfo);
        if (data.customerName !== undefined) setCustomerName(data.customerName);
        if (data.customerAddress !== undefined) setCustomerAddress(data.customerAddress);
        if (data.customerRepresentative !== undefined) setCustomerRepresentative(data.customerRepresentative);
        if (data.customerPosition !== undefined) setCustomerPosition(data.customerPosition);
        if (data.isHandoverMode !== undefined) setIsHandoverMode(data.isHandoverMode);
        if (data.quoteDate) setQuoteDate(data.quoteDate);
        if (data.items) setItems(data.items);
        if (data.vatOption) setVatOption(data.vatOption);
        if (data.customVatRate !== undefined) setCustomVatRate(data.customVatRate);
        if (data.selectedTemplateId) setSelectedTemplateId(data.selectedTemplateId);
        if (data.columnWidths) setColumnWidths(data.columnWidths);
        if (data.sectionColumns) setSectionColumns(data.sectionColumns);
        if (data.layout) setLayout(data.layout);
        if (data.componentSettings) setComponentSettings(data.componentSettings);
      } catch (error) {
        alert('File dữ liệu không hợp lệ!');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const handleAddItem = () => {
    setItems([
      ...items,
      { id: Date.now().toString(), name: '', unit: '', quantity: 0, price: 0, note: '' },
    ]);
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleItemChange = (id: string, field: keyof Item, value: string | number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  const handleImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleItemChange(id, 'image', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBusinessInfo({ ...businessInfo, logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setBusinessInfo({ ...businessInfo, logo: '' });
  };

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBusinessInfo({ ...businessInfo, signature: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveSignature = () => {
    setBusinessInfo({ ...businessInfo, signature: '' });
  };

  const handlePrint = () => {
    if (window.self !== window.top) {
      setShowPrintWarning(true);
    } else {
      window.print();
    }
  };

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + (item.quantity * item.price || 0), 0);
  };

  const subtotal = calculateSubtotal();
  const isVatIncluded = vatOption === 'included';
  const actualVatRate = isVatIncluded ? 0 : (vatOption === 'custom' ? customVatRate : parseFloat(vatOption));
  const vatAmount = subtotal * (actualVatRate / 100);
  const total = subtotal + vatAmount;

  const handleDownloadPDF = () => {
    if (window.self !== window.top) {
      setShowPrintWarning(true);
    } else {
      alert('Để xuất file PDF chất lượng cao nhất:\n\n1. Cửa sổ In sẽ hiện ra.\n2. Ở mục "Máy in" (Destination), chọn "Lưu dưới dạng PDF" (Save as PDF).\n3. Nhấn "Lưu" (Save).');
      const originalTitle = document.title;
      document.title = businessInfo.name || 'Bao_Gia';
      window.print();
      setTimeout(() => {
        document.title = originalTitle;
      }, 1000);
    }
  };

  const handleDownloadExcel = () => {
    const wb = XLSX.utils.book_new();
    
    const wsData = [
      [businessInfo.name],
      [businessInfo.address],
      [`MST: ${businessInfo.taxCode}`, `ĐT: ${businessInfo.phone}`],
      [],
      ['BẢNG BÁO GIÁ'],
      [`Kính gửi: ${customerName}`],
      [`Ngày: ${quoteDate}`],
      [],
      ['STT', 'Tên hàng hóa, dịch vụ', 'ĐVT', 'Số lượng', 'Đơn giá', 'Thành tiền', 'Ghi chú']
    ];

    items.forEach((item, index) => {
      wsData.push([
        index + 1,
        item.name,
        item.unit,
        item.quantity,
        item.price,
        item.quantity * item.price,
        item.note
      ]);
    });

    wsData.push(['', '', '', '', 'CỘNG TIỀN HÀNG:', subtotal, '']);
    if (isVatIncluded) {
      wsData.push(['', '', '', '', 'THUẾ VAT:', 'Đã bao gồm', '']);
    } else {
      wsData.push(['', '', '', '', `THUẾ VAT (${actualVatRate}%):`, vatAmount, '']);
    }
    wsData.push(['', '', '', '', 'TỔNG CỘNG:', total, '']);

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    
    // Set column widths
    ws['!cols'] = [
      { wch: 5 },  // STT
      { wch: 35 }, // Name
      { wch: 10 }, // Unit
      { wch: 10 }, // Qty
      { wch: 15 }, // Price
      { wch: 15 }, // Amount
      { wch: 25 }  // Note
    ];

    XLSX.utils.book_append_sheet(wb, ws, 'Báo Giá');
    
    const safeName = customerName.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'khach_hang';
    XLSX.writeFile(wb, `Bao_Gia_${safeName}.xlsx`);
  };

  const quotationData: QuotationData = {
    businessInfo,
    customerName,
    customerAddress,
    customerRepresentative,
    customerPosition,
    isHandoverMode,
    items,
    subtotal,
    vatRate: actualVatRate,
    isVatIncluded,
    columnWidths,
    quoteDate,
    total,
    rowSpacing,
    printOrientation,
    paperSize,
    margins,
    sectionOrder,
    sectionSpacing,
    sectionColumns,
    layout,
    componentSettings
  };

  const saveToManagement = () => {
    const docId = currentDocumentId || Date.now().toString();
    const docTitle = `${businessInfo.name} - ${customerName || 'Khách hàng mới'}`;
    const newDoc: SavedDocument = {
      id: docId,
      title: docTitle,
      date: quoteDate || new Date().toLocaleDateString('vi-VN'),
      type: isHandoverMode ? 'handover' : 'quotation',
      folderId: saveFolderId || undefined,
      data: quotationData
    };
    
    let updatedDocs;
    if (currentDocumentId) {
      updatedDocs = savedDocuments.map(doc => doc.id === docId ? newDoc : doc);
    } else {
      updatedDocs = [...savedDocuments, newDoc];
      setCurrentDocumentId(docId);
    }
    
    setSavedDocuments(updatedDocs);
    localStorage.setItem('savedDocuments', JSON.stringify(updatedDocs));
    setShowSaveModal(false);
    alert('Đã lưu vào trang quản lý!');
  };

  const SelectedTemplate = TEMPLATES.find(t => t.id === selectedTemplateId)?.component || ClassicTemplate;

  if (currentView === 'management') {
    const filteredDocs = savedDocuments.filter(doc => {
      const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFolder = selectedFolderId ? doc.folderId === selectedFolderId : true;
      return matchesSearch && matchesFolder;
    });

    const handleCreateFolder = () => {
      const name = window.prompt('Nhập tên thư mục mới:');
      if (name) {
        const newFolder: Folder = { id: Date.now().toString(), name };
        const updatedFolders = [...folders, newFolder];
        setFolders(updatedFolders);
        localStorage.setItem('folders', JSON.stringify(updatedFolders));
      }
    };

    const handleDeleteFolder = (id: string) => {
      if (window.confirm('Bạn có chắc chắn muốn xóa thư mục này? Các tài liệu bên trong sẽ không bị xóa.')) {
        const updatedFolders = folders.filter(f => f.id !== id);
        setFolders(updatedFolders);
        localStorage.setItem('folders', JSON.stringify(updatedFolders));
        if (selectedFolderId === id) setSelectedFolderId(null);
      }
    };

    return (
      <div className="min-h-screen bg-gray-100 p-8 font-sans">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <FileText className="text-blue-600" size={32} />
              Quản lý Báo giá & Biên bản
            </h1>
            <button
              onClick={() => {
                setCurrentDocumentId(null);
                setCurrentView('editor');
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium shadow-sm"
            >
              <Plus size={20} />
              Tạo mới
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar: Folders */}
            <div className="w-full md:w-64 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-bold text-gray-700">Thư mục</h2>
                  <button onClick={handleCreateFolder} className="text-blue-600 hover:bg-blue-50 p-1 rounded">
                    <Plus size={18} />
                  </button>
                </div>
                <ul className="space-y-1">
                  <li>
                    <button
                      onClick={() => setSelectedFolderId(null)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${!selectedFolderId ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      Tất cả tài liệu
                    </button>
                  </li>
                  {folders.map(folder => (
                    <li key={folder.id} className="flex items-center group">
                      <button
                        onClick={() => setSelectedFolderId(folder.id)}
                        className={`flex-1 text-left px-3 py-2 rounded-lg transition-colors truncate ${selectedFolderId === folder.id ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                      >
                        {folder.name}
                      </button>
                      <button
                        onClick={() => handleDeleteFolder(folder.id)}
                        className="p-2 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Xóa thư mục"
                      >
                        <X size={14} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Main Content: Document List */}
            <div className="flex-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <input
                    type="text"
                    placeholder="Tìm kiếm tài liệu..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                
                {filteredDocs.length === 0 ? (
                  <div className="p-12 text-center text-gray-500">
                    <FileText size={48} className="mx-auto mb-4 text-gray-300" />
                    <p className="text-lg">Không tìm thấy tài liệu nào.</p>
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm uppercase tracking-wider">
                        <th className="p-4 font-medium">Tên tài liệu</th>
                        <th className="p-4 font-medium">Thư mục</th>
                        <th className="p-4 font-medium">Loại</th>
                        <th className="p-4 font-medium">Ngày tạo</th>
                        <th className="p-4 font-medium text-right">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredDocs.map((doc) => (
                        <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                          <td className="p-4 font-medium text-gray-800">{doc.title}</td>
                          <td className="p-4 text-gray-500 text-sm">
                            {folders.find(f => f.id === doc.folderId)?.name || '-'}
                          </td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                              doc.type === 'quotation' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                            }`}>
                              {doc.type === 'quotation' ? 'Báo giá' : 'Biên bản bàn giao'}
                            </span>
                          </td>
                          <td className="p-4 text-gray-600">{doc.date}</td>
                          <td className="p-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => {
                                  const data = doc.data;
                                  if (data.businessInfo) setBusinessInfo(data.businessInfo);
                                  if (data.customerName !== undefined) setCustomerName(data.customerName);
                                  if (data.customerAddress !== undefined) setCustomerAddress(data.customerAddress);
                                  if (data.customerRepresentative !== undefined) setCustomerRepresentative(data.customerRepresentative);
                                  if (data.customerPosition !== undefined) setCustomerPosition(data.customerPosition);
                                  if (data.isHandoverMode !== undefined) setIsHandoverMode(data.isHandoverMode);
                                  if (data.quoteDate) setQuoteDate(data.quoteDate);
                                  if (data.items) setItems(data.items);
                                  if (data.vatOption) setVatOption(data.vatOption);
                                  if (data.customVatRate !== undefined) setCustomVatRate(data.customVatRate);
                                  if (data.columnWidths) setColumnWidths(data.columnWidths);
                                  if (data.sectionColumns) setSectionColumns(data.sectionColumns);
                                  if (data.layout) setLayout(data.layout);
                                  if (data.componentSettings) setComponentSettings(data.componentSettings);
                                  if (data.paperSize) setPaperSize(data.paperSize);
                                  if (data.printOrientation) setPrintOrientation(data.printOrientation);
                                  if (data.margins) setMargins(data.margins);
                                  if (data.rowSpacing) setRowSpacing(data.rowSpacing);
                                  if (data.selectedTemplateId) setSelectedTemplateId(data.selectedTemplateId);
                                  setCurrentDocumentId(doc.id);
                                  setCurrentView('editor');
                                }}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Xem / Sửa"
                              >
                                <FileText size={18} />
                              </button>
                              <button
                                onClick={() => {
                                  if (window.confirm('Bạn có chắc chắn muốn xóa tài liệu này?')) {
                                    const updatedDocs = savedDocuments.filter(d => d.id !== doc.id);
                                    setSavedDocuments(updatedDocs);
                                    localStorage.setItem('savedDocuments', JSON.stringify(updatedDocs));
                                  }
                                }}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Xóa"
                              >
                                <X size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100 font-sans">
      {/* Column 1: Settings & Customer Area */}
      <div className="w-full lg:w-[350px] xl:w-[400px] flex-shrink-0 border-r bg-white flex flex-col print:hidden h-full">
        <div className="p-4 border-b bg-blue-600 text-white flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <FileText size={20} />
            <h1 className="font-bold text-lg">Tạo Báo Giá</h1>
          </div>
          <div className="flex gap-1 flex-wrap">
            <button
              onClick={() => setCurrentView('management')}
              className="p-2 hover:bg-blue-700 rounded transition-colors flex items-center gap-1 bg-blue-800"
              title="Quản lý tài liệu"
            >
              <FileText size={18} />
              <span className="hidden sm:inline text-sm font-medium">Quản lý</span>
            </button>
            <button
              onClick={() => setShowSaveModal(true)}
              className="p-2 hover:bg-blue-700 rounded transition-colors flex items-center gap-1 bg-blue-800"
              title="Lưu vào quản lý"
            >
              <Save size={18} />
              <span className="hidden sm:inline text-sm font-medium">Lưu</span>
            </button>
            <div className="w-px h-8 bg-blue-400 mx-1 hidden sm:block"></div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 hover:bg-blue-700 rounded transition-colors flex items-center gap-1"
              title="Mở dữ liệu đã lưu"
            >
              <FolderOpen size={18} />
            </button>
            <button
              onClick={() => setIsEditMode(!isEditMode)}
              className={`p-2 rounded transition-colors flex items-center gap-1 ${isEditMode ? 'bg-amber-500 hover:bg-amber-600' : 'hover:bg-blue-700'}`}
              title={isEditMode ? "Tắt sửa trực tiếp" : "Bật sửa trực tiếp"}
            >
              <Type size={18} />
            </button>
            <input 
              type="file" 
              accept=".json" 
              ref={fileInputRef} 
              onChange={handleLoadData} 
              className="hidden" 
            />
            <button
              onClick={handleSaveData}
              className="p-2 hover:bg-blue-700 rounded transition-colors flex items-center gap-1"
              title="Lưu dữ liệu hiện tại"
            >
              <Save size={18} />
            </button>
            <div className="w-px h-8 bg-blue-400 mx-1"></div>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 rounded transition-colors ${showSettings ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
              title="Cài đặt thông tin & Mẫu"
            >
              <Settings2 size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Settings Section */}
          {showSettings && (
            <div className="space-y-4">
              {/* Competitive Quote Section */}
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-100 space-y-3">
                <h2 className="font-semibold text-orange-800 flex items-center gap-2 border-b border-orange-200 pb-2">
                  <LayoutTemplate size={18} /> Báo giá cạnh tranh
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-700">Kích hoạt chế độ:</label>
                    <button 
                      onClick={() => setIsCompetitiveMode(!isCompetitiveMode)}
                      className={`w-12 h-6 rounded-full transition-colors relative ${isCompetitiveMode ? 'bg-orange-500' : 'bg-gray-300'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isCompetitiveMode ? 'left-7' : 'left-1'}`}></div>
                    </button>
                  </div>
                  
                  {isCompetitiveMode && (
                    <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Hướng thay đổi:</label>
                        <div className="flex gap-1 mb-2">
                          <button
                            onClick={() => setCompetitiveDirection('decrease')}
                            className={`flex-1 py-1 text-xs rounded border transition-all ${
                              competitiveDirection === 'decrease' 
                                ? 'bg-red-600 text-white border-red-600 shadow-sm' 
                                : 'bg-white text-gray-700 hover:bg-red-50 border-gray-300'
                            }`}
                          >
                            Giảm giá
                          </button>
                          <button
                            onClick={() => setCompetitiveDirection('increase')}
                            className={`flex-1 py-1 text-xs rounded border transition-all ${
                              competitiveDirection === 'increase' 
                                ? 'bg-green-600 text-white border-green-600 shadow-sm' 
                                : 'bg-white text-gray-700 hover:bg-green-50 border-gray-300'
                            }`}
                          >
                            Tăng giá
                          </button>
                        </div>
                        <label className="block text-xs text-gray-600 mb-1">% Cạnh tranh: {competitiveRate}%</label>
                        <div className="flex gap-2 items-center">
                          <input 
                            type="range" 
                            min="1" 
                            max="100" 
                            value={competitiveRate} 
                            onChange={(e) => setCompetitiveRate(parseInt(e.target.value))}
                            className="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                          />
                          <input 
                            type="number" 
                            min="1" 
                            max="100" 
                            value={competitiveRate} 
                            onChange={(e) => setCompetitiveRate(parseInt(e.target.value))}
                            className="w-16 border rounded px-2 py-1 text-xs text-center outline-none focus:border-orange-500"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Đơn vị cung cấp mới:</label>
                        <select 
                          value={competitiveSupplierId}
                          onChange={(e) => setCompetitiveSupplierId(e.target.value)}
                          className="w-full border rounded px-2 py-1.5 text-sm outline-none focus:border-orange-500"
                        >
                          <option value="">-- Chọn đơn vị --</option>
                          {businessProfiles.map(p => (
                            <option key={p.id} value={p.id}>{p.profileName}</option>
                          ))}
                        </select>
                      </div>
                      
                      <button
                        onClick={applyCompetitiveQuote}
                        className="w-full py-2 bg-orange-600 text-white rounded-md text-sm font-bold hover:bg-orange-700 transition-colors shadow-sm flex items-center justify-center gap-2"
                      >
                        <Upload size={16} /> Áp dụng báo giá
                      </button>
                      <p className="text-[10px] text-gray-500 italic">
                        * Hệ thống sẽ tự động {competitiveDirection === 'increase' ? 'tăng' : 'giảm'} đơn giá theo % đã chọn và cập nhật thông tin đơn vị cung cấp.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Template Selection */}
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 space-y-3">
                <div className="flex items-center justify-between border-b border-indigo-200 pb-2">
                  <h2 className="font-semibold text-indigo-800 flex items-center gap-2">
                    <LayoutTemplate size={18} /> Chọn Mẫu Báo Giá
                  </h2>
                  <button 
                    onClick={() => setIsTemplateSelectionOpen(!isTemplateSelectionOpen)}
                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                  >
                    {isTemplateSelectionOpen ? 'Thu gọn' : 'Mở rộng'}
                  </button>
                </div>
                {isTemplateSelectionOpen && (
                  <div className="grid grid-cols-2 gap-2">
                    {TEMPLATES.map(template => (
                      <button
                        key={template.id}
                        onClick={() => {
                          setSelectedTemplateId(template.id);
                          setIsTemplateSelectionOpen(false);
                        }}
                        className={`p-2 text-sm rounded border text-left transition-all ${
                          selectedTemplateId === template.id 
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' 
                            : 'bg-white text-gray-700 hover:bg-indigo-100 border-gray-300'
                        }`}
                      >
                        {template.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Print Settings */}
              <div className="bg-green-50 p-4 rounded-lg border border-green-100 space-y-3">
                <h2 className="font-semibold text-green-800 flex items-center gap-2 border-b border-green-200 pb-2">
                  <Printer size={18} /> Cấu hình In / Xuất PDF
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Cỡ giấy:</label>
                    <select
                      value={paperSize}
                      onChange={(e) => setPaperSize(e.target.value)}
                      className="w-full p-2 text-sm border rounded bg-white text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                    >
                      <option value="A5">A5</option>
                      <option value="A4">A4</option>
                      <option value="A3">A3</option>
                      <option value="A2">A2</option>
                      <option value="A0">A0</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Khổ in:</label>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setPrintOrientation('portrait')}
                        className={`flex-1 py-2 text-sm rounded border ${printOrientation === 'portrait' ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-700 hover:bg-green-100'}`}
                      >Dọc (Portrait)</button>
                      <button 
                        onClick={() => setPrintOrientation('landscape')}
                        className={`flex-1 py-2 text-sm rounded border ${printOrientation === 'landscape' ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-700 hover:bg-green-100'}`}
                      >Ngang (Landscape)</button>
                      <button 
                        onClick={() => {
                          setPrintOrientation('fix');
                          // Logic for "fix" will be handled by scale or CSS
                        }}
                        className={`flex-1 py-2 text-sm rounded border ${printOrientation === 'fix' ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-700 hover:bg-green-100'}`}
                      >Fix (Tự động)</button>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-xs text-gray-600">Giãn dòng (Row Spacing):</label>
                      <span className="text-xs font-medium text-green-700">{rowSpacing}px</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="50" 
                      value={rowSpacing} 
                      onChange={(e) => setRowSpacing(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-xs text-gray-600">Thu phóng (Scale):</label>
                      <span className="text-xs font-medium text-green-700">{printScale}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="50" 
                      max="150" 
                      value={printScale} 
                      onChange={(e) => setPrintScale(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <p className="text-[10px] text-gray-500 mt-1">Điều chỉnh để fix vừa đủ 1 trang khi in.</p>
                  </div>

                  {/* Section Spacing */}
                  <div className="pt-2 border-t border-green-200">
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-xs font-bold text-green-800 uppercase tracking-wider">Khoảng cách giữa các phần:</label>
                      <span className="text-xs font-medium text-green-700">{sectionSpacing}px</span>
                    </div>
                    <input 
                      type="range" 
                      min="-50" 
                      max="100" 
                      value={sectionSpacing} 
                      onChange={(e) => setSectionSpacing(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Business Info */}
              <div className="bg-gray-50 p-4 rounded-lg border space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <h2 className="font-semibold text-gray-700">Thông tin Đơn vị cung cấp</h2>
                </div>

                {/* Business Profile Library */}
                <div className="bg-white p-3 rounded border border-blue-100 shadow-sm mb-4">
                  <h3 className="text-sm font-medium text-blue-800 mb-2 flex items-center gap-1">
                    <FolderOpen size={16} /> Thư viện Cấu hình
                  </h3>
                  
                  {businessProfiles.length > 0 && (
                    <div className="mb-3 space-y-2">
                      <label className="block text-xs text-gray-500">Chọn cấu hình đã lưu:</label>
                      <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto pr-1">
                        {businessProfiles.map(profile => (
                          <div key={profile.id} className="flex items-center justify-between bg-gray-50 p-2 rounded border text-sm hover:bg-blue-50 transition-colors">
                            <button 
                              onClick={() => loadBusinessProfile(profile.id)}
                              className="flex-1 text-left font-medium text-gray-700 hover:text-blue-600 truncate"
                            >
                              {profile.profileName}
                            </button>
                            <button 
                              onClick={() => deleteBusinessProfile(profile.id)}
                              className="text-red-400 hover:text-red-600 p-1"
                              title="Xóa cấu hình"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={profileNameInput}
                      onChange={(e) => setProfileNameInput(e.target.value)}
                      placeholder="Tên cấu hình mới..."
                      className="flex-1 border rounded px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                    <button
                      onClick={saveBusinessProfile}
                      className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded text-sm font-medium hover:bg-blue-200 transition-colors flex items-center gap-1"
                    >
                      <Save size={14} /> Lưu
                    </button>
                  </div>
                </div>
                
                {/* Logo Upload */}
                <div>
                  <label className="block text-xs text-gray-500 mb-2">Logo doanh nghiệp (Tùy chọn)</label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden relative bg-white flex items-center justify-center group">
                      {businessInfo.logo ? (
                        <>
                          <img src={businessInfo.logo} alt="Logo" className="w-full h-full object-contain p-1" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={handleRemoveLogo} className="text-white text-xs bg-red-500 px-2 py-1 rounded">Xóa</button>
                          </div>
                        </>
                      ) : (
                        <div className="text-gray-400 flex flex-col items-center">
                          <Upload size={20} className="mb-1" />
                          <span className="text-[10px]">Tải logo</span>
                        </div>
                      )}
                      {!businessInfo.logo && (
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      )}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="text-xs text-gray-500">
                        Tải lên logo của bạn để hiển thị trên bảng báo giá. Khuyên dùng ảnh nền trong suốt (PNG).
                      </div>
                      {businessInfo.logo && (
                        <>
                          <div className="flex items-center gap-2">
                            <label className="text-xs text-gray-500 whitespace-nowrap">Kích thước:</label>
                            <input 
                              type="range" 
                              min="30" 
                              max="200" 
                              value={businessInfo.logoSize || 80} 
                              onChange={(e) => setBusinessInfo({ ...businessInfo, logoSize: parseInt(e.target.value) })}
                              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <label className="text-xs text-gray-500 whitespace-nowrap">Vị trí:</label>
                            <div className="flex gap-2">
                              <button 
                                onClick={() => setBusinessInfo({ ...businessInfo, logoPosition: 'left' })}
                                className={`px-2 py-1 text-xs rounded border ${businessInfo.logoPosition === 'left' ? 'bg-blue-100 border-blue-300 text-blue-700' : 'bg-white text-gray-600'}`}
                              >Trái</button>
                              <button 
                                onClick={() => setBusinessInfo({ ...businessInfo, logoPosition: 'center' })}
                                className={`px-2 py-1 text-xs rounded border ${!businessInfo.logoPosition || businessInfo.logoPosition === 'center' ? 'bg-blue-100 border-blue-300 text-blue-700' : 'bg-white text-gray-600'}`}
                              >Giữa</button>
                              <button 
                                onClick={() => setBusinessInfo({ ...businessInfo, logoPosition: 'right' })}
                                className={`px-2 py-1 text-xs rounded border ${businessInfo.logoPosition === 'right' ? 'bg-blue-100 border-blue-300 text-blue-700' : 'bg-white text-gray-600'}`}
                              >Phải</button>
                              <button 
                                onClick={() => setBusinessInfo({ ...businessInfo, logoPosition: 'inline-left' })}
                                className={`px-2 py-1 text-xs rounded border ${businessInfo.logoPosition === 'inline-left' ? 'bg-blue-100 border-blue-300 text-blue-700' : 'bg-white text-gray-600'}`}
                              >Cùng hàng (Trái)</button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Signature Upload */}
                <div>
                  <label className="block text-xs text-gray-500 mb-2">Chữ ký / Con dấu (Tùy chọn)</label>
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-20 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden relative bg-white flex items-center justify-center group">
                      {businessInfo.signature ? (
                        <>
                          <img src={businessInfo.signature} alt="Signature" className="w-full h-full object-contain p-1" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={handleRemoveSignature} className="text-white text-xs bg-red-500 px-2 py-1 rounded">Xóa</button>
                          </div>
                        </>
                      ) : (
                        <div className="text-gray-400 flex flex-col items-center">
                          <Upload size={20} className="mb-1" />
                          <span className="text-[10px]">Tải chữ ký</span>
                        </div>
                      )}
                      {!businessInfo.signature && (
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={handleSignatureUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      )}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="text-xs text-gray-500">
                        Tải lên chữ ký hoặc con dấu để hiển thị ở cuối báo giá. Khuyên dùng ảnh nền trong suốt (PNG).
                      </div>
                      {businessInfo.signature && (
                        <div className="flex items-center gap-2">
                          <label className="text-xs text-gray-500 whitespace-nowrap">Kích thước:</label>
                          <input 
                            type="range" 
                            min="50" 
                            max="300" 
                            value={businessInfo.signatureSize || 120} 
                            onChange={(e) => setBusinessInfo({ ...businessInfo, signatureSize: parseInt(e.target.value) })}
                            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-1">Tên cơ sở / Doanh nghiệp</label>
                  <input
                    type="text"
                    value={businessInfo.name}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, name: e.target.value })}
                    className="w-full border rounded px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-1">Người đại diện</label>
                    <input
                      type="text"
                      value={businessInfo.representativeName || ''}
                      onChange={(e) => setBusinessInfo({ ...businessInfo, representativeName: e.target.value })}
                      placeholder="Tên người đại diện..."
                      className="w-full border rounded px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-1">Chức vụ</label>
                    <input
                      type="text"
                      value={businessInfo.representativePosition || ''}
                      onChange={(e) => setBusinessInfo({ ...businessInfo, representativePosition: e.target.value })}
                      placeholder="Chức vụ..."
                      className="w-full border rounded px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Địa chỉ</label>
                  <input
                    type="text"
                    value={businessInfo.address}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, address: e.target.value })}
                    className="w-full border rounded px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-1">Mã số thuế</label>
                    <input
                      type="text"
                      value={businessInfo.taxCode}
                      onChange={(e) => setBusinessInfo({ ...businessInfo, taxCode: e.target.value })}
                      className="w-full border rounded px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-1">Điện thoại</label>
                    <input
                      type="text"
                      value={businessInfo.phone}
                      onChange={(e) => setBusinessInfo({ ...businessInfo, phone: e.target.value })}
                      className="w-full border rounded px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs text-gray-500">Thông tin thanh toán</label>
                    <label className="flex items-center cursor-pointer">
                      <div className="relative">
                        <input type="checkbox" className="sr-only" checked={businessInfo.showPaymentInfo} onChange={(e) => setBusinessInfo({ ...businessInfo, showPaymentInfo: e.target.checked })} />
                        <div className={`block w-8 h-4 rounded-full ${businessInfo.showPaymentInfo ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                        <div className={`dot absolute left-1 top-1 bg-white w-2 h-2 rounded-full transition ${businessInfo.showPaymentInfo ? 'transform translate-x-4' : ''}`}></div>
                      </div>
                      <span className="ml-2 text-xs text-gray-500">Hiển thị</span>
                    </label>
                  </div>
                  {businessInfo.showPaymentInfo && (
                    <textarea
                      value={businessInfo.paymentInfo || ''}
                      onChange={(e) => setBusinessInfo({ ...businessInfo, paymentInfo: e.target.value })}
                      placeholder="Ngân hàng: ...&#10;Số tài khoản: ...&#10;Chủ tài khoản: ..."
                      rows={3}
                      className="w-full border rounded px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                    />
                  )}
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs text-gray-500">Ghi chú dưới thông tin thanh toán</label>
                    <label className="flex items-center cursor-pointer">
                      <div className="relative">
                        <input type="checkbox" className="sr-only" checked={businessInfo.showNotes} onChange={(e) => setBusinessInfo({ ...businessInfo, showNotes: e.target.checked })} />
                        <div className={`block w-8 h-4 rounded-full ${businessInfo.showNotes ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                        <div className={`dot absolute left-1 top-1 bg-white w-2 h-2 rounded-full transition ${businessInfo.showNotes ? 'transform translate-x-4' : ''}`}></div>
                      </div>
                      <span className="ml-2 text-xs text-gray-500">Hiển thị</span>
                    </label>
                  </div>
                  {businessInfo.showNotes && (
                    <textarea
                      value={businessInfo.notes || ''}
                      onChange={(e) => setBusinessInfo({ ...businessInfo, notes: e.target.value })}
                      placeholder="Báo giá có hiệu lực trong vòng 30 ngày..."
                      rows={2}
                      className="w-full border rounded px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                    />
                  )}
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs text-gray-500">Cột hình ảnh sản phẩm</label>
                    <label className="flex items-center cursor-pointer">
                      <div className="relative">
                        <input type="checkbox" className="sr-only" checked={businessInfo.showItemImages} onChange={(e) => setBusinessInfo({ ...businessInfo, showItemImages: e.target.checked })} />
                        <div className={`block w-8 h-4 rounded-full ${businessInfo.showItemImages ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                        <div className={`dot absolute left-1 top-1 bg-white w-2 h-2 rounded-full transition ${businessInfo.showItemImages ? 'transform translate-x-4' : ''}`}></div>
                      </div>
                      <span className="ml-2 text-xs text-gray-500">Hiển thị</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Customer Section */}
          <div className="space-y-3">
            <h2 className="font-semibold text-gray-700 border-b pb-2">Thông tin Khách hàng</h2>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Kính gửi (Tên khách hàng)</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Nhập tên khách hàng..."
                className="w-full border rounded px-3 py-2 focus:ring-1 focus:ring-blue-500 outline-none mb-3"
              />
              <div className="flex gap-3 mb-3">
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">Người đại diện</label>
                  <input
                    type="text"
                    value={customerRepresentative}
                    onChange={(e) => setCustomerRepresentative(e.target.value)}
                    placeholder="Tên người đại diện..."
                    className="w-full border rounded px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">Chức vụ</label>
                  <input
                    type="text"
                    value={customerPosition}
                    onChange={(e) => setCustomerPosition(e.target.value)}
                    placeholder="Chức vụ..."
                    className="w-full border rounded px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
              <label className="block text-xs text-gray-500 mb-1">Địa chỉ khách hàng (Tùy chọn)</label>
              <input
                type="text"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                placeholder="Nhập địa chỉ khách hàng..."
                className="w-full border rounded px-3 py-2 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Column 2: Items Section */}
      <div className="w-full lg:w-[400px] xl:w-[450px] flex-shrink-0 border-r bg-white flex flex-col print:hidden h-full">
        <div className="p-4 border-b bg-gray-50 flex justify-between items-center flex-wrap gap-2">
          <h2 className="font-bold text-gray-700">Hàng hóa / Dịch vụ</h2>
          <div className="flex gap-2">
            <button
              onClick={() => {
                const newItem: Item = {
                  id: Date.now().toString(),
                  name: '',
                  unit: '',
                  quantity: 0,
                  price: 0,
                  note: '',
                  isTextOnly: true
                };
                setItems([...items, newItem]);
              }}
              className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1 font-medium bg-gray-200 px-2 py-1 rounded"
              title="Thêm dòng chỉ có văn bản"
            >
              <Plus size={16} /> Dòng Text
            </button>
            <button
              onClick={() => excelFileInputRef.current?.click()}
              className="text-sm text-green-600 hover:text-green-800 flex items-center gap-1 font-medium bg-green-50 px-2 py-1 rounded"
              title="Nhập dữ liệu từ file Excel"
            >
              <Upload size={16} /> Nhập Excel
            </button>
            <input 
              type="file" 
              ref={excelFileInputRef} 
              onChange={handleImportExcel} 
              accept=".xlsx, .xls" 
              className="hidden" 
            />
            <button
              onClick={handleAddItem}
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium bg-blue-50 px-2 py-1 rounded"
            >
              <Plus size={16} /> Thêm dòng
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Discount & Rounding Section */}
          <div className="bg-amber-50 p-3 rounded border border-amber-100 space-y-2">
            <h3 className="text-sm font-semibold text-amber-800">Giảm giá & Làm tròn đơn giá</h3>
            <div className="flex gap-2 items-center flex-wrap">
              <div className="flex items-center gap-1">
                <input 
                  type="number" 
                  placeholder="% Giảm" 
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(e.target.value === '' ? '' : parseFloat(e.target.value))}
                  className="w-20 border rounded px-2 py-1.5 text-sm outline-none focus:border-amber-500"
                />
                <button 
                  onClick={() => {
                    if (typeof discountPercent === 'number' && discountPercent > 0) {
                      const multiplier = 1 - (discountPercent / 100);
                      setItems(items.map(item => ({ ...item, price: item.price * multiplier })));
                      setDiscountPercent('');
                    }
                  }}
                  className="bg-amber-600 text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-amber-700 transition-colors"
                >
                  Áp dụng
                </button>
              </div>
              <div className="w-px h-6 bg-amber-200 mx-1 hidden sm:block"></div>
              <button 
                onClick={() => {
                  setItems(items.map(item => {
                    // Làm tròn lên đến 500đ gần nhất (VD: 243.218 -> 243.500)
                    const roundedPrice = Math.ceil(item.price / 500) * 500;
                    return { ...item, price: roundedPrice };
                  }));
                }}
                className="bg-blue-600 text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-blue-700 transition-colors flex-1 sm:flex-none text-center"
                title="Làm tròn lên 500đ (VD: 243.218 -> 243.500)"
              >
                Làm tròn 500đ
              </button>
            </div>
          </div>

          {/* Items Section */}
          <div className="space-y-3">
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={item.id} className="bg-gray-50 p-3 rounded border relative group">
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="absolute -top-2 -right-2 bg-red-100 text-red-600 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-200 z-10"
                    title="Xóa dòng này"
                  >
                    <Trash2 size={14} />
                  </button>
                  
                  <div className="flex gap-3 mb-3">
                    {/* Image Upload Area */}
                    <div className="w-20 h-20 flex-shrink-0 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden relative bg-white hover:border-blue-400 transition-colors group/img">
                      {item.image ? (
                        <>
                          <img src={item.image} alt="Preview" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
                            <span className="text-white text-[10px] font-medium">Đổi ảnh</span>
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                          <ImageIcon size={20} className="mb-1" />
                          <span className="text-[10px]">Thêm ảnh</span>
                        </div>
                      )}
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handleImageUpload(item.id, e)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        title="Tải ảnh lên"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex items-center gap-2">
                        <span className="bg-gray-200 text-gray-600 text-xs font-bold px-2 py-1 rounded">
                          #{index + 1}
                        </span>
                        <textarea
                          value={item.name}
                          onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
                          placeholder="Tên hàng hóa, dịch vụ..."
                          rows={2}
                          className="flex-1 border rounded px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                        />
                      </div>
                      <div className="mt-2">
                        <input
                          type="text"
                          value={item.note}
                          onChange={(e) => handleItemChange(item.id, 'note', e.target.value)}
                          placeholder="Ghi chú thêm..."
                          className="w-full border rounded px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div>
                      <label className="block text-[10px] text-gray-500 uppercase mb-0.5">ĐVT</label>
                      <input
                        type="text"
                        value={item.unit}
                        onChange={(e) => handleItemChange(item.id, 'unit', e.target.value)}
                        className="w-full border rounded px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-500 uppercase mb-0.5">Số lượng</label>
                      <input
                        type="number"
                        value={item.quantity || ''}
                        onChange={(e) => handleItemChange(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                        className="w-full border rounded px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-2">
                      <label className="block text-[10px] text-gray-500 uppercase mb-0.5">Đơn giá (VNĐ)</label>
                      <input
                        type="number"
                        value={item.price || ''}
                        onChange={(e) => handleItemChange(item.id, 'price', parseFloat(e.target.value) || 0)}
                        className="w-full border rounded px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* VAT and Total Summary */}
            <div className="flex justify-end mt-6 bg-gray-50 p-4 rounded border">
              <div className="w-full space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Thuế VAT</label>
                  <select
                    value={vatOption}
                    onChange={(e) => setVatOption(e.target.value)}
                    className="border rounded px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-500 outline-none bg-white"
                  >
                    <option value="included">Đã bao gồm VAT</option>
                    <option value="5">5%</option>
                    <option value="8">8%</option>
                    <option value="10">10%</option>
                    <option value="custom">Tùy chỉnh...</option>
                  </select>
                </div>
                {vatOption === 'custom' && (
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">Nhập % VAT</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={customVatRate}
                      onChange={(e) => setCustomVatRate(parseFloat(e.target.value) || 0)}
                      className="w-20 border rounded px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-500 outline-none text-right"
                    />
                  </div>
                )}
                <div className="flex items-center justify-between text-sm pt-2 border-t">
                  <span className="text-gray-600">Cộng tiền hàng:</span>
                  <span className="font-medium">{new Intl.NumberFormat('vi-VN').format(subtotal)} đ</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Tiền thuế VAT:</span>
                  <span className="font-medium">
                    {isVatIncluded ? 'Đã bao gồm' : `${new Intl.NumberFormat('vi-VN').format(vatAmount)} đ`}
                  </span>
                </div>
                <div className="flex items-center justify-between text-base font-bold text-blue-700 pt-3 border-t">
                  <span>Tổng cộng:</span>
                  <span>{new Intl.NumberFormat('vi-VN').format(total)} đ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Column 3: Preview Area (A4 Document) */}
      <div className="flex-1 overflow-y-auto bg-gray-200 p-4 lg:p-8 flex flex-col items-center print:p-0 print:bg-white print:overflow-visible print:block relative">
        <div className="w-full max-w-4xl flex justify-between items-center gap-2 mb-4 print:hidden flex-wrap">
            <div className="flex items-center gap-3 bg-white p-2 rounded border shadow-sm flex-wrap">
              <label className="text-sm font-bold text-gray-700 whitespace-nowrap">Lề trang (mm):</label>
              <div className="flex items-center gap-1">
                <label className="text-xs text-gray-500">Trên</label>
                <input type="number" value={margins.top} onChange={(e) => setMargins({ ...margins, top: parseInt(e.target.value) || 0 })} className="w-12 border rounded px-1 py-1 text-xs outline-none" />
              </div>
              <div className="flex items-center gap-1">
                <label className="text-xs text-gray-500">Dưới</label>
                <input type="number" value={margins.bottom} onChange={(e) => setMargins({ ...margins, bottom: parseInt(e.target.value) || 0 })} className="w-12 border rounded px-1 py-1 text-xs outline-none" />
              </div>
              <div className="flex items-center gap-1">
                <label className="text-xs text-gray-500">Trái</label>
                <input type="number" value={margins.left} onChange={(e) => setMargins({ ...margins, left: parseInt(e.target.value) || 0 })} className="w-12 border rounded px-1 py-1 text-xs outline-none" />
              </div>
              <div className="flex items-center gap-1">
                <label className="text-xs text-gray-500">Phải</label>
                <input type="number" value={margins.right} onChange={(e) => setMargins({ ...margins, right: parseInt(e.target.value) || 0 })} className="w-12 border rounded px-1 py-1 text-xs outline-none" />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleDownloadExcel}
                className="p-2 hover:bg-green-700 rounded transition-colors flex items-center gap-1 bg-green-600 border border-green-500 text-white shadow-sm"
                title="Tải file Excel"
              >
                <Table size={18} />
                <span className="hidden sm:inline text-sm font-medium">Excel</span>
              </button>
              <button
                onClick={handleDownloadPDF}
                disabled={isExporting}
                className={`p-2 rounded transition-colors flex items-center gap-1 border text-white shadow-sm ${
                  isExporting ? 'bg-red-400 border-red-400 cursor-not-allowed' : 'hover:bg-red-700 bg-red-600 border-red-500'
                }`}
                title="Tải file PDF"
              >
                <FileDown size={18} />
                <span className="hidden sm:inline text-sm font-medium">{isExporting ? 'Đang tạo...' : 'PDF'}</span>
              </button>
              <button
                onClick={handlePrint}
                className="p-2 hover:bg-blue-700 rounded transition-colors flex items-center gap-1 bg-blue-800 text-white shadow-sm"
                title="In báo giá"
              >
                <Printer size={18} />
                <span className="hidden sm:inline text-sm font-medium">In</span>
              </button>
            </div>
        </div>
        <style type="text/css" media="print">
          {`
            @page { 
              size: ${paperSize} ${printOrientation === 'fix' ? '' : printOrientation}; 
              margin: ${margins.top}mm ${margins.right}mm ${margins.bottom}mm ${margins.left}mm; 
            }
            #print-area {
              transform: scale(${printScale / 100}) !important;
              transform-origin: top left !important;
            }
          `}
        </style>
        <style>
          {`
            #print-area, #print-area * {
              font-family: ${fontFamily} !important;
            }
          `}
        </style>
        
        {isEditMode && <WysiwygToolbar />}
        
        <div 
          id="print-area" 
          contentEditable={isEditMode}
          suppressContentEditableWarning={true}
          style={{ 
            transform: `scale(${printScale / 100})`, 
            transformOrigin: 'top center',
            transition: 'transform 0.2s ease-in-out',
            outline: isEditMode ? '2px dashed #f59e0b' : 'none',
            outlineOffset: '4px',
            fontFamily: fontFamily
          }}
        >
          <SelectedTemplate 
            data={quotationData} 
            onReorder={(newItems) => setItems(newItems)}
            onRowSpacingChange={(spacing) => setRowSpacing(spacing)}
            onMarginsChange={(newMargins) => setMargins(newMargins)}
            onSectionOrderChange={(newOrder) => setSectionOrder(newOrder)}
            onSectionSpacingChange={(spacing) => setSectionSpacing(spacing)}
            onSectionColumnsChange={(sectionId, columns) => setSectionColumns({ ...sectionColumns, [sectionId]: columns })}
            onLayoutChange={(newLayout) => setLayout(newLayout)}
            onComponentSettingsChange={(settings) => setComponentSettings(settings)}
            onColumnWidthsChange={(widths) => setColumnWidths(widths)}
            onQuoteDateChange={(date) => setQuoteDate(date)}
            activeRowId={activeRowId}
            onActiveRowChange={setActiveRowId}
          />
        </div>

          {/* Global Settings Panel */}
        <div className={`fixed right-8 top-24 bg-white border border-gray-200 rounded-xl shadow-2xl transition-all duration-300 z-50 print:hidden flex flex-col ${isGlobalSettingsOpen ? 'w-72 p-5 gap-6' : 'w-12 p-2 gap-2 items-center'}`}>
          <button 
            onClick={() => setIsGlobalSettingsOpen(!isGlobalSettingsOpen)}
            className="w-full flex justify-center items-center text-gray-500 hover:text-blue-600 transition-colors"
            title={isGlobalSettingsOpen ? "Thu gọn" : "Mở rộng cài đặt"}
          >
            <Settings2 size={20} />
          </button>
          
          {isGlobalSettingsOpen && (
            <>
              <div>
                <label className="flex items-center justify-between cursor-pointer bg-blue-50 p-3 rounded-lg border border-blue-100 mb-4">
                  <span className="text-sm font-bold text-blue-800">Chế độ Biên bản bàn giao</span>
                  <div className="relative">
                    <input type="checkbox" className="sr-only" checked={isHandoverMode} onChange={(e) => setIsHandoverMode(e.target.checked)} />
                    <div className={`block w-10 h-6 rounded-full ${isHandoverMode ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${isHandoverMode ? 'transform translate-x-4' : ''}`}></div>
                  </div>
                </label>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Phông chữ</label>
                <select 
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                  className="w-full border rounded px-2 py-1.5 text-sm outline-none focus:border-blue-500"
                >
                  <option value="Inter">Inter (Mặc định)</option>
                  <option value="Arial, sans-serif">Arial</option>
                  <option value="'Times New Roman', serif">Times New Roman</option>
                  <option value="Roboto, sans-serif">Roboto</option>
                  <option value="'Open Sans', sans-serif">Open Sans</option>
                  <option value="'Courier New', monospace">Courier New</option>
                </select>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold text-gray-500 uppercase mb-3">
                  <span>Giãn dòng mục</span>
                  <span>{rowSpacing || 0}px</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="50" 
                  value={rowSpacing || 0} 
                  onChange={(e) => setRowSpacing(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold text-gray-500 uppercase mb-3">
                  <span>Giãn cách phần</span>
                  <span>{sectionSpacing || 0}px</span>
                </div>
                <input 
                  type="range" 
                  min="-50" 
                  max="100" 
                  value={sectionSpacing || 0} 
                  onChange={(e) => setSectionSpacing(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
              <div className="border-t pt-4">
                <label className="text-xs font-bold text-gray-500 uppercase block mb-4">Độ rộng cột (%)</label>
                <div className="space-y-4">
                  {['stt', 'name', 'unit', 'quantity', 'price', 'amount'].map((col) => (
                    <div key={col} className="flex items-center justify-between gap-3">
                      <span className="text-[10px] uppercase text-gray-500 w-12">{col === 'stt' ? 'STT' : col === 'name' ? 'Tên' : col === 'unit' ? 'ĐVT' : col === 'quantity' ? 'SL' : col === 'price' ? 'Giá' : 'Tổng'}</span>
                      <input 
                        type="range" 
                        min="2" 
                        max="80" 
                        value={columnWidths?.[col as keyof typeof columnWidths] || 0} 
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          setColumnWidths({ ...columnWidths!, [col]: val });
                        }}
                        className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Active Row Settings Panel */}
        {activeRowId && (
          <DraggablePanel 
            title="Cài đặt thành phần" 
            onClose={() => setActiveRowId(null)}
            defaultPosition={{ x: 20, y: 100 }}
          >
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold text-gray-500 uppercase mb-3">
                  <span>Giãn cách phần</span>
                  <span>{layout.find(r => r.id === activeRowId)?.spacing || 0}px</span>
                </div>
                <input 
                  type="range" 
                  min="-50" 
                  max="100" 
                  value={layout.find(r => r.id === activeRowId)?.spacing || 0} 
                  onChange={(e) => {
                    const newLayout = layout.map(r => r.id === activeRowId ? { ...r, spacing: parseInt(e.target.value) } : r);
                    setLayout(newLayout);
                  }}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            </div>
          </DraggablePanel>
        )}
      </div>

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm print:hidden">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Lưu tài liệu</h3>
              <button onClick={() => setShowSaveModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Tên tài liệu</label>
              <input
                type="text"
                value={`${businessInfo.name} - ${customerName || 'Khách hàng mới'}`}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
              />
              <p className="text-xs text-gray-500 mt-1">Tên tài liệu được tạo tự động từ tên đơn vị và khách hàng.</p>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">Chọn thư mục lưu</label>
                <button
                  onClick={() => {
                    const name = window.prompt('Nhập tên thư mục mới:');
                    if (name) {
                      const newFolder: Folder = { id: Date.now().toString(), name };
                      const updatedFolders = [...folders, newFolder];
                      setFolders(updatedFolders);
                      localStorage.setItem('folders', JSON.stringify(updatedFolders));
                      setSaveFolderId(newFolder.id);
                    }
                  }}
                  className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                >
                  <Plus size={12} />
                  Tạo thư mục mới
                </button>
              </div>
              <select
                value={saveFolderId || ''}
                onChange={(e) => setSaveFolderId(e.target.value || null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="">-- Không có thư mục (Lưu ở ngoài) --</option>
                {folders.map(folder => (
                  <option key={folder.id} value={folder.id}>{folder.name}</option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowSaveModal(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors font-medium text-sm"
              >
                Hủy
              </button>
              <button
                onClick={saveToManagement}
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors font-medium text-sm flex items-center gap-2"
              >
                <Save size={16} />
                Lưu tài liệu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Print Warning Modal */}
      {showPrintWarning && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm print:hidden">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-4 text-amber-600">
              <div className="p-2 bg-amber-100 rounded-full">
                <Printer size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Tính năng in bị hạn chế</h3>
            </div>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Bạn đang xem ứng dụng trong chế độ <strong>Xem trước (Preview)</strong>. Trình duyệt thường chặn tính năng in ở chế độ này.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-100">
              <p className="text-sm text-blue-800 font-medium mb-3">Vui lòng mở ứng dụng ở một tab riêng biệt để sử dụng tính năng In và xuất PDF:</p>
              <a 
                href={window.location.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-4 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                onClick={() => setShowPrintWarning(false)}
              >
                Mở ứng dụng ở Tab mới
              </a>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowPrintWarning(false);
                  // Vẫn thử gọi lệnh in phòng trường hợp trình duyệt cho phép
                  setTimeout(() => window.print(), 300);
                }}
                className="px-5 py-2.5 bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-lg transition-colors font-medium text-sm"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

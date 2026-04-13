export interface Item {
  id: string;
  name: string;
  unit: string;
  quantity: number;
  price: number;
  note: string;
  image?: string;
  isTextOnly?: boolean;
}

export interface BusinessInfo {
  name: string;
  address: string;
  taxCode: string;
  phone: string;
  email?: string;
  website?: string;
  logo?: string;
  logoSize?: number;
  logoPosition?: 'left' | 'center' | 'right' | 'inline-left';
  signature?: string;
  signatureSize?: number;
  paymentInfo?: string;
  showPaymentInfo?: boolean;
  notes?: string;
  showNotes?: boolean;
  showItemImages?: boolean;
  representativeName?: string;
  representativePosition?: string;
}

export interface BusinessProfile {
  id: string;
  profileName: string;
  data: BusinessInfo;
}

export interface LayoutRow {
  id: string;
  columns: string[]; // Array of component IDs: 'business', 'title', 'date', 'customer', 'items', 'footer'
  spacing: number;
}

export interface ComponentSettings {
  alignment: 'left' | 'center' | 'right';
}

export interface QuotationData {
  businessInfo: BusinessInfo;
  customerName: string;
  customerAddress?: string;
  customerRepresentative?: string;
  customerPosition?: string;
  isHandoverMode?: boolean;
  items: Item[];
  subtotal: number;
  vatRate: number;
  isVatIncluded: boolean;
  total: number;
  rowSpacing?: number;
  printOrientation?: 'portrait' | 'landscape' | 'fix';
  paperSize?: string;
  margins?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  sectionOrder?: string[];
  sectionSpacing?: number;
  sectionColumns?: Record<string, number>;
  layout?: LayoutRow[];
  componentSettings?: Record<string, ComponentSettings>;
  quoteDate?: string;
  columnWidths?: {
    stt: number;
    name: number;
    unit: number;
    quantity: number;
    price: number;
    amount: number;
  };
}

export interface TemplateProps {
  data: QuotationData;
  onReorder?: (items: Item[]) => void;
  onRowSpacingChange?: (spacing: number) => void;
  onMarginsChange?: (margins: { top: number; right: number; bottom: number; left: number }) => void;
  onSectionOrderChange?: (order: string[]) => void;
  onSectionSpacingChange?: (spacing: number) => void;
  onSectionColumnsChange?: (sectionId: string, columns: number) => void;
  onLayoutChange?: (layout: LayoutRow[]) => void;
  onComponentSettingsChange?: (settings: Record<string, ComponentSettings>) => void;
  onColumnWidthsChange?: (widths: { stt: number; name: number; unit: number; quantity: number; price: number; amount: number }) => void;
  onQuoteDateChange?: (date: string) => void;
  activeRowId?: string | null;
  onActiveRowChange?: (rowId: string | null) => void;
}

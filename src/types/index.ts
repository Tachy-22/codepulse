export interface ProductT {
  id: string;
  name: string;
  title: string;
  orderId: string;
  description: string;
  price: number;
  code: string;
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
  files: TabData[];
  currentLevel: string[];
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  purchases?: string[];
}

export interface ProductData extends ProductT {
  installations: Array<{ title: string; description: string; code: string }>;
  fileTree: string;
  currentLevel: string[];
  optimizationSuggestions: string[];
  usefulLinks: Array<{ title: string; href: string }>;
  [key: string]: unknown;
}

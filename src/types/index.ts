export interface ProductT {
  id: string;
  name: string;
  title: string;

  description: string;
  price: number;
  code: string;
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
  files: TabData[];
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  purchases?: string[];
}

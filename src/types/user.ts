export interface User {
  id: string;
  email: string;
  name: string;
  provider: "EMAIL" | "GOOGLE" | "FACEBOOK" | "APPLE"; // Add provider field
  createdAt: string;
  updatedAt: string;
  [key: string]: string; // For flexibility
}

export interface CreateUserInput {
  id: string;
  email: string;
  name: string;
  provider?: "EMAIL" | "GOOGLE" | "FACEBOOK" | "APPLE";
}
